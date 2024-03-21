import React, { useState } from "react";
import "./Drop.css";
import MyDatePicker from "./DatePicker";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function Drop() {
  const {
    adults,
    setAdults,
    child,
    setChild,
    baggages,
    setBaggages,
    selectedOption,
    setSelectedOption,
    showOptions,
    setShowOptions,
    selectedDate,
    setSelectedDate,
    log,
    bookings,
    setBookings,
    scrollBlocked,
    bookDestination,
    newBooking,
    setNewBooking,
  } = useContext(GlobalContext);

  // console.log(selectedOption);

  function increaseAdults() {
    setAdults(adults + 1 <= 10 ? adults + 1 : 10);
  }

  function decreaseAdults() {
    setAdults(adults - 1 >= 0 ? adults - 1 : 0);
  }

  function increaseChild() {
    setChild(child + 1 <= 10 ? child + 1 : 10);
  }

  function decreaseChild() {
    setChild(child - 1 >= 0 ? child - 1 : 0);
  }

  const maxBaggages = adults + child;

  function increaseBaggages() {
    setBaggages(baggages + 1 <= maxBaggages ? baggages + 1 : maxBaggages);
  }

  function decreaseBaggages() {
    setBaggages(baggages - 1 >= 0 ? baggages - 1 : 0);
  }

  function show(option) {
    setSelectedOption(option);
    setShowOptions(false);
  }
  function toggleOptions(e) {
    e.stopPropagation();
    e.preventDefault();
    setShowOptions(!showOptions);
  }

  const [showModal, setShowModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = () => {
    const totalPrices = adults * 70000 + child * 50000 + baggages * 1000;
    setTotalPrice(totalPrices);
    // Mostra il modale di conferma
    setShowModal(true);
  };

  const handleConfirm = () => {
    const newBooking1 = {
      adults: adults,
      child: child,
      baggages: baggages,
      selectedOption: selectedOption,
      selectedDate: String(selectedDate),
    };

    bookDestination(newBooking1);
    // localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem(
      "bookings",
      JSON.stringify([...bookings, newBooking1])
    );

    setAdults(0);
    setChild(0);
    setBaggages(0);
    setSelectedOption("");
    setSelectedDate("");

    console.log("Modulo inviato!");

    // Chiudi il modale di conferma
    setShowModal(false);
  };

  const handleCancel = () => {
    // Chiudi il modale di conferma
    setShowModal(false);
  };

  console.log(selectedDate);

  /* ----------------prices-------------------- */

  const navigate = useNavigate();
  function goToBook() {
    navigate("../book");
  }

  return (
    <div className="container">
      <h4 className="drop-title">Choose your destination</h4>

      <div className={`dropdown ${showOptions ? "active" : ""}`}>
        <input
          onClick={toggleOptions}
          type="text"
          name="planet"
          className="textbox"
          placeholder="Choose the planet"
          value={selectedOption}
          readOnly
        />
        {showOptions && (
          <div className="options">
            <div name="moon" onClick={() => show("moon")}>
              moon
            </div>
            <div name="mars" onClick={() => show("mars")}>
              mars
            </div>
            <div name="venus" onClick={() => show("venus")}>
              venus
            </div>
            <div name="mercury" onClick={() => show("mercury")}>
              mercury
            </div>
            <div name="jupiter" onClick={() => show("jupiter")}>
              jupiter
            </div>
            <div name="saturn" onClick={() => show("saturn")}>
              saturn
            </div>
            <div name="neptune" onClick={() => show("neptune")}>
              neptune
            </div>
            <div name="uranus" onClick={() => show("uranus")}>
              uranus
            </div>
          </div>
        )}
      </div>
      <MyDatePicker></MyDatePicker>
      <div className="grid-1100">
        <div className="items-drop">
          <div id="adults" className="number-selector">
            <p>Adults</p>
            <div>
              <button onClick={decreaseAdults}>-</button>
              <span>{adults}</span>
              <button onClick={increaseAdults}>+</button>
            </div>
          </div>

          <div id="passengers" className="number-selector">
            <p>Children</p>
            <div>
              <button onClick={decreaseChild}>-</button>
              <span>{child}</span>
              <button onClick={increaseChild}>+</button>
            </div>
          </div>

          <div id="baggages" className="number-selector">
            <p>Baggages</p>
            <div>
              <button onClick={decreaseBaggages}>-</button>
              <span>{baggages}</span>
              <button onClick={increaseBaggages}>+</button>
            </div>
          </div>
        </div>

        <div className="cart-btn-container">
          <button
            onClick={handleSubmit}
            disabled={
              !selectedOption || !selectedDate || (adults === 0 && child === 0)
            }
          >
            Add to cart
          </button>
          <button onClick={goToBook}>Go to my books</button>
        </div>
      </div>

      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={handleCancel}
        contentLabel="add destination to cart?"
      >
        <p>add destination to cart?</p>
        <br />
        <p className="p-modal">
          Option selected: <span>{selectedOption}</span>{" "}
        </p>
        <br />

        <p className="p-modal">
          Adults: {adults}
          <span> {adults * 70000}$</span>
        </p>
        <br />

        <p className="p-modal">
          Children: {child} <span>{child * 50000}$</span>
        </p>
        <br />

        <p className="p-modal">
          Baggages: {baggages} <span>{baggages * 1000}$</span>
        </p>
        <br />

        <p className="p-modal">
          Total : <span>{totalPrice} $</span>
        </p>
        <br />

        <p>
          Selected date: <br />
          {selectedDate &&
            `${selectedDate.getDate()}/${
              selectedDate.getMonth() + 1
            }/${selectedDate.getFullYear()} ${
              selectedDate.getHours() + 12
            }:${String(selectedDate.getMinutes()).padStart(2, "0")}`}
        </p>
        <br />

        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Delete</button>
      </Modal>
    </div>
  );
}

export default Drop;