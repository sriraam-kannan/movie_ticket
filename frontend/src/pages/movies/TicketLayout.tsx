import React, { useState, useEffect } from "react";
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
import neoAxios from "@/lib/neoAxios";

interface SeatProps {
  id: string;
  isSelected: boolean;
  isBooked: boolean;
  onSelect: (id: string) => void;
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
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowTime, setSelectedShowTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const ticketPrice = 120;

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
    if (selectedTheater && selectedShowTime && selectedDate) {
      const fetchBookedSeats = async () => {
        try {
          const response = await neoAxios.post("/api/movies/bookedTickets", {
            theatreName: selectedTheater,
            showTime: selectedShowTime,
            date: format(selectedDate, "yyyy-MM-dd"),
          });
          setBookedSeats(response.data);
        } catch (error) {
          console.error("Error fetching booked seats:", error);
        }
      };
      fetchBookedSeats();
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedShowTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select Show Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                <SelectItem value="02:30 PM">02:30 PM</SelectItem>
                <SelectItem value="06:30 PM">06:30 PM</SelectItem>
                <SelectItem value="10:30 PM">10:30 PM</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setSelectedDate(new Date(value))}
              value={selectedDate ? selectedDate.toString() : ""}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Select Date"
                  value={selectedDate ? format(selectedDate, "PPP") : ""}
                />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((date) => (
                  <SelectItem key={date.toString()} value={date.toString()}>
                    {format(date, "PPP")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selected seats display */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Selected Seats</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {selectedSeats.length > 0 ? (
              <ul>
                {selectedSeats.map((seat) => (
                  <li key={seat}>{seat}</li>
                ))}
              </ul>
            ) : (
              <p>No seats selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Seat Arrangement</h2>

        <div
          className={cn(
            "bg-gray-100 p-4 rounded-lg overflow-x-auto transition duration-500 ease-in-out",
            !isSelectionComplete && "blur-sm opacity-50 pointer-events-none"
          )}
        >
          <div className="inline-block">
            <div className="mb-4 flex justify-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-500 mr-2"></div>
                <span>Booked</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>{generateSeats().seatsLeftSide}</div>
              <div>{generateSeats().seatsRightSide}</div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleBooking}>Confirm Booking</Button>

      {isSummaryOpen && (
        <TicketSummaryPopup
          selectedSeats={selectedSeats}
          theaterName={selectedTheater}
          showTime={selectedShowTime}
          showDate={selectedDate}
          ticketPrice={ticketPrice}
          closeSummary={closeSummary}
        />
      )}
    </div>
  );
};

export default TheaterBookingPage;
