import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import neoAxios from "@/lib/neoAxios";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import TicketSummaryPopup from "./TicketSummary";

interface SeatProps {
  id: string;
  isSelected: boolean;
  isBooked: boolean;
  onSelect: (id: string) => void;
}

interface MovieDetails {
  Title: string;
  imdbID: string;
  name: string;
}

const Seat: React.FC<SeatProps> = ({ id, isSelected, isBooked, onSelect }) => {
  return (
    <button
      className={cn(
        "w-8 h-8 rounded-t-lg border-2 border-b-4 border-b-black focus:outline-none",
        isBooked
          ? "bg-gray-500 cursor-not-allowed"
          : isSelected
          ? "bg-red-500 border-red-700"
          : "bg-green-500 border-green-700 hover:bg-green-400"
      )}
      onClick={() => !isBooked && onSelect(id)}
      disabled={isBooked}
    >
      {id.split("-")[1]}
    </button>
  );
};

const TheaterBookingPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id", id);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowTime, setSelectedShowTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null); // Updated to be an object or null
  const ticketPrice = 120;

  // Generate the next 5 dates for selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const availableDates = generateDates();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const OMDB_API_KEY = "7055a610";
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
        );
        const data = await response.json();
        setMovieDetails(data); // Updated to store the movie object
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (selectedTheater && selectedShowTime && selectedDate) {
        try {
          const showTimeParts = selectedShowTime.split(" ");
          const [time, period] = showTimeParts;
          const [hours, minutes] = time.split(":");
          let hour = parseInt(hours, 10);

          // Convert 12-hour format to 24-hour format
          if (period === "PM" && hour !== 12) hour += 12;
          if (period === "AM" && hour === 12) hour = 0;

          // Construct full date-time object
          const fullShowTime = new Date(selectedDate);
          fullShowTime.setHours(hour, parseInt(minutes, 10), 0, 0);

          const response = await neoAxios.get("/movies/bookedTickets", {
            params: {
              theatreName: selectedTheater,
              showTime: fullShowTime.toISOString(),
              date: fullShowTime.toISOString().split("T")[0],
            },
          });

          setBookedSeats(response.data);
        } catch (error) {
          console.error("Error fetching booked seats:", error);
        }
      }
    };

    fetchBookedSeats();
  }, [selectedTheater, selectedShowTime, selectedDate]);

  const handleSeatSelect = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    if (
      selectedSeats.length > 0 &&
      selectedTheater &&
      selectedShowTime &&
      selectedDate
    ) {
      setIsSummaryOpen(true);
    } else {
      window.alert("Please select seats.");
    }
  };

  const generateSeats = () => {
    const rows = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
    ];
    const seatsPerRow = 10;

    const seatsLeftSide = [];
    const seatsRightSide = [];

    for (let i = 0; i < rows.length; i++) {
      const rowLeft = [];
      const rowRight = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatId = `${rows[i]}-${j}`;
        if (j <= 5) {
          rowLeft.push(
            <Seat
              key={seatId}
              id={seatId}
              isSelected={selectedSeats.includes(seatId)}
              isBooked={bookedSeats.includes(seatId)}
              onSelect={handleSeatSelect}
            />
          );
        } else {
          rowRight.push(
            <Seat
              key={seatId}
              id={seatId}
              isSelected={selectedSeats.includes(seatId)}
              isBooked={bookedSeats.includes(seatId)}
              onSelect={handleSeatSelect}
            />
          );
        }
      }
      seatsLeftSide.push(
        <div key={`left-${rows[i]}`} className="flex justify-center gap-1 mb-1">
          <span className="w-6 text-right pr-2">{rows[i]}</span>
          {rowLeft}
        </div>
      );
      seatsRightSide.push(
        <div
          key={`right-${rows[i]}`}
          className="flex justify-center gap-1 mb-1"
        >
          {rowRight}
          <span className="w-6 text-left pl-2">{rows[i]}</span>
        </div>
      );
    }

    return { seatsLeftSide, seatsRightSide };
  };

  const isSelectionComplete =
    selectedTheater && selectedShowTime && selectedDate;

  const closeSummary = () => {
    setIsSummaryOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ticket Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
        {/* Selection criteria */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
          <div className="space-y-4">
            <Select onValueChange={setSelectedTheater}>
              <SelectTrigger>
                <SelectValue placeholder="Select Theater" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sangam Cinemas">Sangam Cinemas</SelectItem>
                <SelectItem value="PVR Cinemas">PVR Cinemas</SelectItem>
                <SelectItem value="INOX">INOX</SelectItem>
                <SelectItem value="Sathyam Cinemas">Sathyam Cinemas</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedShowTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select Show Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                <SelectItem value="07:00 PM">07:00 PM</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <label className="block font-medium mb-1">Select Date:</label>
              <div className="flex gap-4">
                {availableDates.map((date) => (
                  <Button
                    key={date.toString()}
                    variant={selectedDate === date ? "default" : "secondary"}
                    onClick={() => setSelectedDate(date)}
                  >
                    {format(date, "dd MMM yyyy")}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seat Map */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Seats</h2>
          <div className="flex justify-around">
            <div>{generateSeats().seatsLeftSide}</div>
            <div>{generateSeats().seatsRightSide}</div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      {movieDetails && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Movie: {movieDetails.Title} (ID: {movieDetails.imdbID})
          </h2>
        </div>
      )}

      <Button onClick={handleBooking} disabled={!isSelectionComplete}>
        Proceed to Summary
      </Button>

      {isSummaryOpen && (
        <TicketSummaryPopup
          isOpen={isSummaryOpen}
          onClose={closeSummary}
          selectedSeats={selectedSeats}
          selectedTheater={selectedTheater}
          selectedShowTime={selectedShowTime}
          selectedDate={selectedDate}
          movieName={movieDetails?.Title}
          ticketPrice={ticketPrice}
          username="username"
          email="email"
          Title={movieDetails?.Title || ""}
          imdbID={movieDetails?.imdbID || ""}
          name={movieDetails?.name || ""}
        />
      )}
    </div>
  );
};

export default TheaterBookingPage;
