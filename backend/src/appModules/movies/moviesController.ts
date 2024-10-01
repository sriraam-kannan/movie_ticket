import { Request, Response } from "express";
import db from "../../database/db";

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
    });
    return res.status(201).json({ message: "Ticket booked successfully" });
  } catch (error) {
    console.error("Error booking ticket:", error);
    return res.status(500).json({ error: "Error booking ticket" });
  }
}

export async function fetchTicket(
  req: Request,
  res: Response
): Promise<Response> {
  const { email } = req.params;

  try {
    const ticket = await db("booked_tickets").where({ email });
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

export async function getBookedTickets(req: Request, res: Response) {
  const { theatreName, showTime, date } = req.query;

  try {
    const tickets = await db("booked_tickets")
      .select("seat_number")
      .modify((queryBuilder) => {
        queryBuilder.where("theatre_name", theatreName);
        queryBuilder.where("show_time", showTime);
        queryBuilder.whereRaw("DATE(show_time) = ?", [date]);
      });

    if (tickets.length === 0) {
      return res.status(200).json([]);
    }

    const bookedSeats = tickets.flatMap((ticket: { seat_number: string }) =>
      JSON.parse(ticket.seat_number)
    );
    return res.status(200).json(bookedSeats);
  } catch (error) {
    console.error("Error fetching booked tickets:", error);
    return res.status(500).json({ error: "Error fetching booked tickets" });
  }
}
