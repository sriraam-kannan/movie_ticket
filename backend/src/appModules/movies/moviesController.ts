import { Request, Response } from "express";
import db from "../../database/db";
import { format } from "date-fns";

export async function bookTicket(
  req: Request,
  res: Response
): Promise<Response> {
  const {
    username,
    email,
    totalSeats,
    seatNumbers,
    showTime,
    amountPaid,
    theatreName,
    imdbId,
    movieName,
    selectedDate,
  } = req.body;

  console.log("incoming request body", req.body);

  try {
    await db("booked_tickets").insert({
      username,
      email,
      total_seats: totalSeats,
      seat_number: JSON.stringify(seatNumbers),
      show_time: showTime,
      amount_paid: amountPaid,
      theatre_name: theatreName,
      imdb_id: imdbId,
      movie_name: movieName,
      show_date: format(new Date(selectedDate), "yyyy-MM-dd"),
    });
    return res.status(201).json({ message: "Ticket booked successfully" });
  } catch (error) {
    console.error("Error booking ticket:", error);
    return res
      .status(500)
      .json({ message: "Error booking ticket", error: error });
  }
}

export async function fetchTicket(
  req: Request,
  res: Response
): Promise<Response> {
  const { email } = req.params;

  try {
    const ticket = await db("booked_tickets").where({ email });
    console.log("ticket", ticket);
    if (ticket) {
      return res.status(200).json(ticket);
    } else {
      return res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return res
      .status(500)
      .json({ message: "Error fetching ticket", error: error });
  }
}

export async function getBookedTickets(req: Request, res: Response) {
  const { theatreName, showTime, date } = req.query;
  console.log("getBookedTickets API hit successfulls");

  try {
    const tickets = await db("booked_tickets")
      .select("seat_number")
      .where("theatre_name", theatreName)
      .where("show_time", showTime)
      .where("show_date", date);

    if (tickets.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching booked tickets:", error);
    return res
      .status(500)
      .json({ message: "Error fetching booked tickets", error: error });
  }
}
