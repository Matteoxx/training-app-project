import { Component} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{

  // usernamePage = document.querySelector('#username-page');
  // chatPage = document.querySelector('#chat-page');
  usernameForm = document.querySelector('#usernameForm');
  messageForm = document.querySelector('#messageForm');
  messageInput = document.querySelector<HTMLInputElement>('#message');
  messageArea = document.querySelector('#messageArea');
  connectingElement = document.querySelector('.connecting');

  stompClient = null;
  username = null;

  colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];



  onError(error: Error) {
    document.querySelector<HTMLDivElement>('.connecting').textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    document.querySelector<HTMLDivElement>('.connecting').style.color = 'red';
  }


  sendMessage(event: Event) {
      var messageContent = document.querySelector<HTMLInputElement>('#message').value.trim();
      if(messageContent && this.stompClient) {
          var chatMessage = {
              sender: this.username,
              content: document.querySelector<HTMLInputElement>('#message').value,
              type: 'CHAT'
          };
          this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
          document.querySelector<HTMLInputElement>('#message').value = '';
      }
      event.preventDefault();
  }


  onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = this.getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    this.messageArea.appendChild(messageElement);
    this.messageArea.scrollTop = this.messageArea.scrollHeight;
  }

  getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % this.colors.length);
    return this.colors[index];
  }

  connect(event: Event) {
    this.username = document.querySelector<HTMLInputElement>('#name').value.trim();

    if(this.username) {
        document.querySelector<HTMLDivElement>('#username-page').classList.add('hidden');
        document.querySelector<HTMLDivElement>('#chat-page').classList.remove('hidden');

        const _this = this;
        var socket = new SockJS('https://applicationfitness.herokuapp.com/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, function(frame){
        
          _this.stompClient.subscribe('/topic/public', function (payload) {

            var message = JSON.parse(payload.body);

            var messageElement = document.createElement('li');

            if(message.type === 'JOIN') {
                messageElement.classList.add('event-message');
                message.content = message.sender + ' joined!';
            } else if (message.type === 'LEAVE') {
                messageElement.classList.add('event-message');
                message.content = message.sender + ' left!';
            } else {
                messageElement.classList.add('chat-message');

                var avatarElement = document.createElement('i');
                var avatarText = document.createTextNode(message.sender[0]);
                avatarElement.appendChild(avatarText);
                avatarElement.style['background-color'] = _this.getAvatarColor(message.sender);

                messageElement.appendChild(avatarElement);

                var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(message.sender);
                usernameElement.appendChild(usernameText);
                messageElement.appendChild(usernameElement);
            }

            var textElement = document.createElement('p');
            var messageText = document.createTextNode(message.content);
            textElement.appendChild(messageText);

            messageElement.appendChild(textElement);

            document.querySelector('#messageArea').appendChild(messageElement);
            document.querySelector('#messageArea').scrollTop = document.querySelector('#messageArea').scrollHeight;

          });

          _this.stompClient.send("/app/chat.addUser",{}, JSON.stringify({sender: this.username, type: 'JOIN'}))
  
          document.querySelector<HTMLDivElement>('.connecting').classList.add('hidden');
        }, this.onError);
    event.preventDefault();
    }
  }

}