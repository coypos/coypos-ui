import { Modal } from "bootstrap";

export function showModal(e: string) {
  const myModal = new Modal(
    document.getElementById("staticBackdrop") as Element
  );
  myModal.show();
  document.getElementsByClassName("errobody")[0].innerHTML =
    "Wystąpił błąd kasy, kasa została zamknięta. Poproś o pomoc sprzedawce. </br>" +
    e;
}
export function hideModal() {
  const myModal = new Modal(
    document.getElementById("staticBackdrop") as Element
  );
  return myModal.hide();
}
export function hideCountModal() {
  const buttn = document.getElementById("close");
  if (buttn) {
    buttn.click();
  }
}
export function showCountModal() {
  const myModal2 = new Modal(
    document.getElementById("staticBackdropPin") as Element
  );
  myModal2.show();
}
