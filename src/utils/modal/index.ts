export function toggleModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;

    if(modal.getAttribute('open') !== null)
        modal.close();
    else
        modal.showModal();
}