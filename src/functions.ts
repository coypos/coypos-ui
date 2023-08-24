import { Modal } from "bootstrap";

export function showModal() {
  const myModal = new Modal(
    document.getElementById("staticBackdrop") as Element
  );
  myModal.show();
}
