import { Router } from "express";
import { bookTicket, fetchTicket, getBookedTickets } from "./moviesController";

const router = Router();

router.post("/bookTicket", (req, res) => {
  bookTicket(req, res).catch((e) => {
    console.error(e);
    res.status(500).send({ message: "Internal server error", error: e });
  });
});

router.get("/fetchTicket/:email", (req, res) => {
  fetchTicket(req, res).catch((e) => {
    console.error(e);
    res.status(500).send({ message: "Internal server error", error: e });
  });
});

router.get("/bookedTickets", (req, res) => {
  getBookedTickets(req, res).catch((e) => {
    console.error(e);
    res.status(500).send({ message: "Internal server error", error: e });
  });
});

export default router;
