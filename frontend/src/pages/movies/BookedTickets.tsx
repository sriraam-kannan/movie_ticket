import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, Loader, MapPinIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import neoAxios from "@/lib/neoAxios"; // Ensure you have this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BookedTickets() {
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await neoAxios.get("/movies/fetchTickets");
        setBookings(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "upcoming") {
      return new Date(booking.date) > new Date();
    }
    if (filter === "past") {
      return new Date(booking.date) <= new Date();
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
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-[100px] w-[70px] rounded-md">
                <AvatarImage src={booking.posterUrl} alt={booking.movieTitle} />
                <AvatarFallback>{booking.movieTitle[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{booking.movieTitle}</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(booking.date), "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center mt-1">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    {format(new Date(booking.date), "h:mm a")}
                  </div>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {booking.cinema}
              </div>
              <div className="flex flex-wrap gap-2">
                {booking.seats.map((seat) => (
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
