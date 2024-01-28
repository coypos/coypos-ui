import { Modal } from "bootstrap";

export function showModal(e: string) {
  const myModal = new Modal(
    document.getElementById("staticBackdrop") as Element
  );
  myModal.show();
  document.getElementsByClassName("modal-body")[0].innerHTML =
    "Wystąpił błąd kasy, kasa została zamknięta. Poproś o pomoc sprzedawce. </br>" +
    e;
}
export function showCountModal() {
  const myModal2 = new Modal(
    document.getElementById("staticBackdropPin") as Element
  );
  myModal2.show();
}
