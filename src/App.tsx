import { useState, useEffect } from 'react';
import type { FilterOptions, Location, RestroomWithDistance, Review, Restroom } from './types';
import { getCurrentLocation } from './utils/geolocation';
import { applyFilters, addDistanceAndSort } from './utils/filters';
import { sampleRestrooms } from './data/sampleRestrooms';
import FilterChips from './components/FilterChips';
import RestroomCard from './components/RestroomCard';
import CompactRestroomCard from './components/CompactRestroomCard';
import BottomSheet from './components/BottomSheet';
import RestroomDetail from './components/RestroomDetail';
import AddReviewForm from './components/AddReviewForm';
import AddBathroomForm from './components/AddBathroomForm';
import MapView from './components/MapView';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const App = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    wheelchairAccessible: false,
    genderNeutral: false,
    wildcardFree: false,
    sortByDistance: true,
  });
  const [filteredRestrooms, setFilteredRestrooms] = useState<RestroomWithDistance[]>([]);
  const [selectedRestroom, setSelectedRestroom] = useState<RestroomWithDistance | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAddBathroomForm, setShowAddBathroomForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [showListView, setShowListView] = useState(false);
  const [allRestrooms, setAllRestrooms] = useState<Restroom[]>(sampleRestrooms);
  const [isLoadingRestrooms, setIsLoadingRestrooms] = useState(false);

  // Get user location on mount
  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        setUserLocation(location);
        setLocationError(null);
        setIsLoadingLocation(false);
      })
      .catch((error) => {
        console.error('Location error:', error);
        setLocationError('Unable to get your location. Please enable location services.');
        // Default to Northwestern campus center
        setUserLocation({
          latitude: 42.0551,
          longitude: -87.6750,
        });
        setIsLoadingLocation(false);
      });
  }, []);

  // Load restrooms from Firestore
  useEffect(() => {
    const loadRestrooms = async () => {
      setIsLoadingRestrooms(true);
      try {
        const restroomsRef = collection(db, 'restrooms');
        const q = query(restroomsRef, orderBy('lastUpdated', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const firestoreRestrooms: Restroom[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            buildingName: data.buildingName,
            floor: data.floor,
            location: data.location,
            isWheelchairAccessible: data.isWheelchairAccessible,
            isGenderNeutral: data.isGenderNeutral,
            requiresWildcard: data.requiresWildcard,
            photoUrls: data.photoUrls || [],
            accessibilityNotes: data.accessibilityNotes,
            status: data.status || 'open',
            lastUpdated: data.lastUpdated?.toDate() || new Date(),
          };
        });

        // Combine sample data with user-contributed data
        setAllRestrooms([...sampleRestrooms, ...firestoreRestrooms]);
      } catch (error) {
        console.error('Error loading restrooms:', error);
        // Fall back to sample data
        setAllRestrooms(sampleRestrooms);
      } finally {
        setIsLoadingRestrooms(false);
      }
    };

    loadRestrooms();
  }, []);

  // Filter and sort restrooms when location or filters change
  useEffect(() => {
    if (userLocation) {
      const filtered = applyFilters(allRestrooms, filters);
      const sorted = addDistanceAndSort(filtered, userLocation);
      setFilteredRestrooms(sorted);
    }
  }, [userLocation, filters, allRestrooms]);

  const handleReviewSubmit = (review: Omit<Review, 'id' | 'createdAt' | 'flags'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
      flags: 0,
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleBathroomSubmit = async (restroomData: {
    name: string;
    buildingName: string;
    floor: string;
    location: Location;
    isWheelchairAccessible: boolean;
    isGenderNeutral: boolean;
    requiresWildcard: boolean;
    accessibilityNotes?: string;
  }) => {
    try {
      const newRestroom = {
        ...restroomData,
        status: 'open' as const,
        lastUpdated: new Date(),
        photoUrls: [],
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'restrooms'), newRestroom);
      
      // Add to local state
      const restroomWithId: Restroom = {
        ...newRestroom,
        id: docRef.id,
      };
      
      setAllRestrooms([...allRestrooms, restroomWithId]);
      setShowAddBathroomForm(false);
      
      // Show success message (you could add a toast notification here)
      alert('✅ Restroom added successfully! Thank you for contributing!');
    } catch (error) {
      console.error('Error adding restroom:', error);
      alert('❌ Failed to add restroom. Please try again.');
    }
  };

  const nearestRestroom = filteredRestrooms[0];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Compact Header */}
      <header className="bg-purple-600 text-white shadow-lg flex-shrink-0">
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">🚽 FlushRush</h1>
            <p className="text-xs text-purple-100">Northwestern Campus</p>
          </div>
          <button
            onClick={() => setShowListView(!showListView)}
            className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {showListView ? '🗺️ Map' : '📋 List'}
          </button>
        </div>
      </header>

      {/* Main Content - Full height */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Filters - Collapsible */}
        <div className="bg-white shadow-md flex-shrink-0 border-b border-gray-200">
          <FilterChips filters={filters} onChange={setFilters} />
        </div>

        {/* Location Status Banner */}
        {(isLoadingLocation || locationError) && (
          <div className="flex-shrink-0">
            {isLoadingLocation && (
              <div className="bg-blue-50 border-b-2 border-blue-300 px-4 py-2 text-center">
                <p className="text-blue-800 text-sm">📍 Getting your location...</p>
              </div>
            )}
            {locationError && (
              <div className="bg-yellow-50 border-b-2 border-yellow-300 px-4 py-2">
                <p className="text-yellow-800 text-xs">{locationError}</p>
              </div>
            )}
          </div>
        )}

        {/* Map or List View - Takes remaining space */}
        {!showListView && userLocation ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Map Section - 50% of remaining space */}
            <div className="h-1/2 relative">
              <MapView
                userLocation={userLocation}
                restrooms={filteredRestrooms}
                onRestroomClick={setSelectedRestroom}
              />
              
              {/* Floating Nearest Restroom Card - More compact */}
              {nearestRestroom && !isLoadingLocation && (
                <div className="absolute top-3 left-3 right-3 bg-white rounded-lg shadow-xl p-3 z-[1000] border-2 border-purple-400">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-purple-600 font-bold mb-0.5">🎯 NEAREST</div>
                      <h3 className="font-bold text-sm truncate">{nearestRestroom.buildingName}</h3>
                      <p className="text-xs text-gray-600 truncate">{nearestRestroom.floor}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-purple-600 font-semibold">
                          {nearestRestroom.distance < 1000
                            ? `${Math.round(nearestRestroom.distance)}m`
                            : `${(nearestRestroom.distance / 1000).toFixed(1)}km`}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{nearestRestroom.estimatedWalkTime} min</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRestroom(nearestRestroom)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex-shrink-0"
                    >
                      View
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Nearby List Section - 50% of remaining space */}
            <div className="h-1/2 bg-gradient-to-b from-gray-50 to-white border-t-2 border-gray-200 overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
                <h2 className="text-sm font-bold text-gray-900">
                  📍 Nearby Restrooms ({filteredRestrooms.length})
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {filteredRestrooms.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-sm mb-1">No restrooms match your filters</p>
                    <p className="text-gray-500 text-xs">Try adjusting your settings</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredRestrooms.slice(0, 10).map((restroom) => (
                      <CompactRestroomCard
                        key={restroom.id}
                        restroom={restroom}
                        onClick={() => setSelectedRestroom(restroom)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Full List View */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {filteredRestrooms.length === 0 ? 'No restrooms found' : `${filteredRestrooms.length} Restrooms`}
              </h2>
              {filteredRestrooms.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-gray-600 mb-2">No restrooms match your filters</p>
                  <p className="text-gray-500 text-sm">Try adjusting your filter settings</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRestrooms.map((restroom) => (
                    <RestroomCard
                      key={restroom.id}
                      restroom={restroom}
                      onClick={() => setSelectedRestroom(restroom)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Restroom Detail Bottom Sheet */}
      <BottomSheet
        isOpen={selectedRestroom !== null && !showReviewForm}
        onClose={() => setSelectedRestroom(null)}
      >
        {selectedRestroom && (
          <RestroomDetail
            restroom={selectedRestroom}
            reviews={reviews.filter((r) => r.restroomId === selectedRestroom.id)}
            onClose={() => setSelectedRestroom(null)}
            onAddReview={() => setShowReviewForm(true)}
          />
        )}
      </BottomSheet>

      {/* Add Review Bottom Sheet */}
      <BottomSheet
        isOpen={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        title="Add Review"
      >
        {selectedRestroom && (
          <AddReviewForm
            restroomId={selectedRestroom.id}
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        )}
      </BottomSheet>

      {/* Add Bathroom Bottom Sheet */}
      <BottomSheet
        isOpen={showAddBathroomForm}
        onClose={() => setShowAddBathroomForm(false)}
        title="Add New Restroom"
      >
        <AddBathroomForm
          userLocation={userLocation}
          onSubmit={handleBathroomSubmit}
          onCancel={() => setShowAddBathroomForm(false)}
        />
      </BottomSheet>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddBathroomForm(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center text-3xl transition-all duration-200 hover:scale-110 z-[2000]"
        aria-label="Add new restroom"
        title="Add a restroom"
      >
        +
      </button>

      {/* Loading indicator for restrooms */}
      {isLoadingRestrooms && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-[2000] border-2 border-purple-400">
          <p className="text-sm text-purple-600 font-medium">Loading restrooms...</p>
        </div>
      )}
    </div>
  );
};

export default App;
