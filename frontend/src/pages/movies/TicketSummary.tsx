import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface TicketSummaryPopupProps {
  selectedSeats: string[];
  theaterName: string;
  showTime: string;
  showDate: Date | null;
  ticketPrice: number;
  closeSummary: () => void;
}

const TicketSummaryPopup: React.FC<TicketSummaryPopupProps> = ({
  selectedSeats,
  theaterName,
  showTime,
  showDate,
  ticketPrice,
  closeSummary,
}) => {
  const totalPrice = selectedSeats.length * ticketPrice;

  const handleConfirm = () => {
    const bookingDetails = {
      theater: theaterName,
      seats: selectedSeats,
      showTime,
      showDate: showDate ? format(showDate, "PPP") : null,
      pricePerSeat: ticketPrice,
      totalPrice,
    };

    // This is where you can replace with API call logic later
    console.log("Booking confirmed:", bookingDetails);

    closeSummary(); // Close the summary popover
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Ticket Summary</h2>
        <p>
          <strong>Theater:</strong> {theaterName}
        </p>
        <p>
          <strong>Show Time:</strong> {showTime}
        </p>
        <p>
          <strong>Show Date:</strong>{" "}
          {showDate ? format(showDate, "PPP") : "N/A"}
        </p>
        <p>
          <strong>Seats:</strong> {selectedSeats.join(", ")}
        </p>
        <p>
          <strong>Total Price:</strong> {totalPrice} INR
        </p>

        <div className="mt-4">
          <Button onClick={handleConfirm} className="mr-2">
            Confirm Booking
          </Button>
          <Button variant="outline" onClick={closeSummary}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketSummaryPopup;
