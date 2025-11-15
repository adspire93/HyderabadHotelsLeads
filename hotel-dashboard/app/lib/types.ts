export interface Hotel {
  hotel_name: string;
  google_place_id: string;
  full_address: string;
  latitude: number;
  longitude: number;
  google_rating: number | null;
  user_ratings_total: number | null;
  price_level: number | null;
  primary_phone: string | null;
  website: string | null;
  star_segment: string | null;
  primary_email: string | null;
  alternate_emails: string | null;
  travel_desk_phone: string | null;
  travel_desk_email: string | null;
  alternate_phones: string | null;
  notes: string | null;
}
