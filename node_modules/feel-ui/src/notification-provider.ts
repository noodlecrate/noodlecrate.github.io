export class NotificationProvider {

  private _notificationElement: HTMLElement;

  public constructor() {

    this._notificationElement = document.getElementById("notification-stream");

    if (this._notificationElement === null) {
      this._notificationElement = document.createElement("div");
      this._notificationElement.id = "notification-stream";
      document.body.appendChild(this._notificationElement);
    }

  }

  public showSuccess(title: string, message: string) {
    let newNotification = document.createElement("div");
    newNotification.className = "notification success";
    this._showNotification(newNotification, title, message);
  }

  public showError(title: string, message: string) {
    let newNotification = document.createElement("div");
    newNotification.className = "notification error";
    this._showNotification(newNotification, title, message);

  }

  private _showNotification(notificationElement: HTMLElement, title: string, message: string) {
    if (title) {
      notificationElement.innerHTML += "<div class='title'>" + title + "</div>";
    }

    if (message) {
      notificationElement.innerHTML += "<div class='message'>" + message + "</div>";
    }

    this._notificationElement.appendChild(notificationElement);

    setTimeout(() => {
      this._notificationElement.removeChild(notificationElement);
    }, 5000);

  }
}
