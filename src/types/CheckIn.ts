// This file defines the CheckIn interface, which represents a user's check-in data including location and timestamp.
export interface CheckIn {
  id: string;// Unique identifier for the check-in, generated using crypto.randomUUID()
  timestamp: number;// Timestamp of the check-in in milliseconds since the Unix epoch
  latitude: number;// Latitude and longitude of the check-in location
  longitude: number;// Latitude and longitude of the check-in location
  accuracy: number;// Accuracy of the location in meters
  note?: string; // Optional field for any additional notes about the check-in  
}
