import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon, ClockIcon, Loader, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import neoAxios from "@/lib/neoAxios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Booking {
  id: number;
  username: string;
  email: string;
  total_seats: number;
  seat_number: string[];
  show_time: string;
  amount_paid: string;
  theatre_name: string;
  imdb_id: string;
  movie_name: string;
  created_at: string;
}

const parseDate = (dateString: string) => {
  try {
    return parseISO(dateString);
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date(); // Fallback to current date if parsing fails
  }
};

export default function BookedTickets() {
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const userDetails = JSON.parse(localStorage.getItem("login") || "{}");
  const userEmail = userDetails?.userEmail;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await neoAxios.get(`/movies/fetchTicket/${userEmail}`);
        setBookings(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = parseDate(booking.created_at);
    if (filter === "upcoming") {
      return bookingDate > new Date();
    }
    if (filter === "past") {
      return bookingDate <= new Date();
    }
    return true;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Booked Tickets</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </p>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter bookings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <CardTitle>{booking.movie_name}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(parseDate(booking.created_at), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center mt-1">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {booking.show_time}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {booking.theatre_name}
              </div>
              <div className="flex flex-wrap gap-2">
                {booking.seat_number.map((seat) => (
                  <Badge key={seat} variant="secondary">
                    Seat {seat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
