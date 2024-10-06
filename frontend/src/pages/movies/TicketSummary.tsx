import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import neoAxios from "@/lib/neoAxios";
import { useNavigate } from "react-router-dom";

interface TicketSummaryPopupProps {
  isOpen: boolean;
  selectedSeats: string[];
  selectedTheater: string;
  selectedShowTime: string;
  selectedDate: Date | null;
  ticketPrice: number;
  username: string;
  email: string;

  Title: string;
  imdbID: string;
  name: string;
  movieName?: string;

  onClose: () => void;
}

const TicketSummaryPopup: React.FC<TicketSummaryPopupProps> = ({
  selectedSeats,
  selectedTheater,
  selectedShowTime,
  selectedDate,
  ticketPrice,
  Title,
  imdbID,
  onClose,
}) => {
  const navigate = useNavigate();
  const totalPrice = selectedSeats.length * ticketPrice;

  const handleConfirm = async () => {
    const userDetails = JSON.parse(localStorage.getItem("login") || "{}");
    try {
      await neoAxios.post("/movies/bookTicket", {
        username: userDetails.userName,
        email: userDetails.userEmail,
        totalSeats: selectedSeats.length,
        seatNumbers: selectedSeats,
        showTime: selectedShowTime,
        amountPaid: totalPrice,
        theatreName: selectedTheater,
        imdbId: imdbID,
        movieName: Title,
        selectedDate: selectedDate?.toISOString().split("T")[0],
      });
      navigate("/movies/mytickets");
      onClose();
    } catch (err) {
      console.error("Error confirming booking:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Ticket Summary</h2>

        <div className="mb-4">
          <p className="font-bold">Selected Theater:</p>
          <p>{selectedTheater}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold">Show Time:</p>
          <p>{selectedShowTime}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold">Show Date:</p>
          <p>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold">Selected Seats:</p>
          <p>{selectedSeats.join(", ")}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold">Ticket Price:</p>
          <p>{`$${totalPrice}`}</p>
        </div>

        <div className="text-right">
          <Button onClick={handleConfirm} className="mr-2">
            Confirm Booking
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketSummaryPopup;
