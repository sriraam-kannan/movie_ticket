import { Request, Response } from "express";
import db from "../../database/db";

// Book ticket
export async function bookTicket(
  req: Request,
  res: Response
): Promise<Response> {
  const { username, email, totalSeats, seatNumbers, showTime, amountPaid } =
    req.body;

  try {
    await db("booked_tickets").insert({
      username,
      email,
      total_seats: totalSeats,
      seat_number: JSON.stringify(seatNumbers),
      show_time: showTime,
      amount_paid: amountPaid,
    });
    return res.status(201).json({ message: "Ticket booked successfully" });
  } catch (error) {
    console.error("Error booking ticket:", error);
    return res.status(500).json({ error: "Error booking ticket" });
  }
}

// Fetch ticket
export async function fetchTicket(
  req: Request,
  res: Response
): Promise<Response> {
  const { email } = req.params;

  try {
    const ticket = await db("booked_tickets").where({ email }).first();
    if (ticket) {
      return res.status(200).json(ticket);
    } else {
      return res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return res.status(500).json({ error: "Error fetching ticket" });
  }
}
