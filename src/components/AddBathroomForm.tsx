import { useState, useEffect } from "react";
import type { Location } from "../types";

interface AddBathroomFormProps {
  userLocation: Location | null;
  initialValues?: Partial<{
    name: string;
    buildingName: string;
    floor: string;
    location: Location;
    isWheelchairAccessible: boolean;
    isGenderNeutral: boolean;
    requiresWildcard: boolean;
    accessibilityNotes?: string;
    hours?: string;
    wildcardHours?: string;
    indoorDirections?: string;
  }>;
  onSubmit: (restroom: {
    name: string;
    buildingName: string;
    floor: string;
    location: Location;
    isWheelchairAccessible: boolean;
    isGenderNeutral: boolean;
    requiresWildcard: boolean;
    accessibilityNotes?: string;
    hours?: string;
    wildcardHours?: string;
    indoorDirections?: string;
  }) => void;
  onCancel: () => void;
}

const AddBathroomForm = ({
  userLocation,
  initialValues,
  onSubmit,
  onCancel,
}: AddBathroomFormProps) => {
  const [buildingName, setBuildingName] = useState("");
  const [floor, setFloor] = useState("");
  const [name, setName] = useState("");
  const [isWheelchairAccessible, setIsWheelchairAccessible] = useState(false);
  const [isGenderNeutral, setIsGenderNeutral] = useState(false);
  const [requiresWildcard, setRequiresWildcard] = useState(false);
  const [accessibilityNotes, setAccessibilityNotes] = useState("");
  const [hours, setHours] = useState("");
  const [wildcardHours, setWildcardHours] = useState("");
  const [indoorDirections, setIndoorDirections] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [customLat, setCustomLat] = useState("");
  const [customLng, setCustomLng] = useState("");

  useEffect(() => {
    if (initialValues) {
      if (initialValues.buildingName)
        setBuildingName(initialValues.buildingName);
      if (initialValues.floor) setFloor(initialValues.floor);
      if (initialValues.name) setName(initialValues.name);
      if (typeof initialValues.isWheelchairAccessible === "boolean")
        setIsWheelchairAccessible(initialValues.isWheelchairAccessible);
      if (typeof initialValues.isGenderNeutral === "boolean")
        setIsGenderNeutral(initialValues.isGenderNeutral);
      if (typeof initialValues.requiresWildcard === "boolean")
        setRequiresWildcard(initialValues.requiresWildcard);
      if (initialValues.accessibilityNotes)
        setAccessibilityNotes(initialValues.accessibilityNotes);
      if (initialValues.hours) setHours(initialValues.hours);
      if (initialValues.wildcardHours)
        setWildcardHours(initialValues.wildcardHours);
      if(initialValues.indoorDirections)
        setIndoorDirections(initialValues.indoorDirections);
      if (initialValues.location) {
        setUseCurrentLocation(false);
        setCustomLat(String(initialValues.location.latitude));
        setCustomLng(String(initialValues.location.longitude));
      }
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let location: Location;
    if (useCurrentLocation && userLocation) {
      location = userLocation;
    } else {
      location = {
        latitude: parseFloat(customLat),
        longitude: parseFloat(customLng),
      };
    }

    onSubmit({
      name: name || "Main Restroom",
      buildingName,
      floor,
      location,
      isWheelchairAccessible,
      isGenderNeutral,
      requiresWildcard,
      accessibilityNotes: accessibilityNotes.trim() || "",
      hours: hours.trim() || undefined,
      wildcardHours: wildcardHours.trim() || undefined,
      indoorDirections: indoorDirections.trim() || undefined,
    });
  };

  const isValid =
    buildingName && floor && (useCurrentLocation || (customLat && customLng));

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pb-4">
      {/* Building Information */}
      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
          🏢 Building Information
        </h3>

        <div className="space-y-2">
          <div>
            <label
              htmlFor="buildingName"
              className="block text-xs font-medium text-gray-900 mb-1"
            >
              Building Name *
            </label>
            <input
              id="buildingName"
              type="text"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              placeholder="e.g., Technological Institute"
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="floor"
                className="block text-xs font-medium text-gray-900 mb-1"
              >
                Floor *
              </label>
              <input
                id="floor"
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="2nd Floor"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-900 mb-1"
              >
                Name (Optional)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="East Wing"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
          📍 Location
        </h3>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useCurrentLocation}
              onChange={(e) => setUseCurrentLocation(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-xs text-gray-900">
              Use my current location
            </span>
          </label>

          {!useCurrentLocation && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="lat"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Latitude *
                </label>
                <input
                  id="lat"
                  type="number"
                  step="any"
                  value={customLat}
                  onChange={(e) => setCustomLat(e.target.value)}
                  placeholder="42.0551"
                  required={!useCurrentLocation}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lng"
                  className="block text-xs text-gray-700 mb-1"
                >
                  Longitude *
                </label>
                <input
                  id="lng"
                  type="number"
                  step="any"
                  value={customLng}
                  onChange={(e) => setCustomLng(e.target.value)}
                  placeholder="-87.6750"
                  required={!useCurrentLocation}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
          ♿ Accessibility Features
        </h3>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isWheelchairAccessible}
              onChange={(e) => setIsWheelchairAccessible(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-xs text-gray-900">
              ♿ Wheelchair Accessible
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isGenderNeutral}
              onChange={(e) => setIsGenderNeutral(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-xs text-gray-900">🚻 Gender Neutral</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={requiresWildcard}
              onChange={(e) => setRequiresWildcard(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-xs text-gray-900">🔐 Requires Wildcard</span>
          </label>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-medium text-gray-900 mb-1"
        >
          Additional Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={accessibilityNotes}
          onChange={(e) => setAccessibilityNotes(e.target.value)}
          placeholder="Any helpful details..."
          rows={2}
          maxLength={300}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {accessibilityNotes.length}/300
        </p>
      </div>


      <div className="grid grid-cols-1 gap-2">
        <div>
          <label
            htmlFor="indoorDirections"
            className="block text-xs font-medium text-gray-900 mb-1"
          >
            Indoor Directions (How to get there inside the building)
          </label>
          <input
            id="indoorDirections"
            type="text"
            value={indoorDirections}
            onChange={(e) => setIndoorDirections(e.target.value)}
            placeholder="e.g., South side of 2nd floor near elevators"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          {/* <p className="text-xs text-gray-500 mt-1">
            Optional : helps users find the restroom inside the building.
          </p> */}
        </div>
      </div>

      {/* Operating Hours */}
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label
            htmlFor="hours"
            className="block text-xs font-medium text-gray-900 mb-1"
          >
            Operating Hours (no wildcard)
          </label>
          <input
            id="hours"
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g., 9:00-17:00 or 09:00 to 17:00"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          {/* <p className="text-xs text-gray-500 mt-1">
            Optional : helps show when building is open.
          </p> */}
        </div>

        <div>
          <label
            htmlFor="wildcardHours"
            className="block text-xs font-medium text-gray-900 mb-1"
          >
            Operating Hours (requires wildcard/access card)
          </label>
          <input
            id="wildcardHours"
            type="text"
            value={wildcardHours}
            onChange={(e) => setWildcardHours(e.target.value)}
            placeholder="e.g., 18:00-08:00"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          {/* <p className="text-xs text-gray-500 mt-1">
            Optional hours when access requires wildcard/card.
          </p> */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 py-2.5 px-4 bg-purple-600 text-white font-medium text-sm rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Add Restroom
        </button>
      </div>
    </form>
  );
};

export default AddBathroomForm;
