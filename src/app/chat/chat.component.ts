import { Component, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

interface LoginResponse {
  body: boolean;
  token: string;
  username: string;
  roles: string[];
  photo: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  constructor(private renderer: Renderer2){}

  @ViewChild('chatPage') chatPage: ElementRef;
  @ViewChild('messageForm') messageForm: ElementRef;
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('messageArea') messageArea: ElementRef;
  @ViewChild('connectingElement') connectingElement: ElementRef;

  stompClient = null;
  username = null;

  colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  userData: LoginResponse = JSON.parse(localStorage.getItem('userData'));
  token = this.userData.token;
  sender = this.userData.username;

  onError(error: Error) {
    const text = this.renderer.createText('Could not connect to WebSocket server. Please refresh this page to try again!');
    this.renderer.appendChild(this.connectingElement.nativeElement, text);
    this.renderer.setStyle(this.connectingElement.nativeElement, 'color', 'red');
  }


  sendMessage(event: Event) {

      var messageContent = this.messageInput.nativeElement.value.trim();
      if(messageContent && this.stompClient) {
          var chatMessage = {
              sender: this.sender,
              content: this.messageInput.nativeElement.value,
              date: new Date(),
              type: 'CHAT'
          };

          this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
          this.messageInput.nativeElement.value = '';
      }
      event.preventDefault();
  }

  getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % this.colors.length);
    return this.colors[index];
  }

  connect() {

    const _this = this;
    
    var socket = new SockJS('https://applicationfitness.herokuapp.com/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, function(frame){
    
      _this.stompClient.subscribe('/topic/public', function (payload) {


        var message = JSON.parse(payload.body);

        var messageElement = _this.renderer.createElement('li');
     

        if(message.type === 'JOIN') {
            _this.renderer.addClass(messageElement, 'event-message');

            message.content = message.sender + ' joined!';
        } else if (message.type === 'LEAVE') {
            _this.renderer.addClass(messageElement, 'event-message');

            message.content = message.sender + ' left!';
        } else {
            _this.renderer.addClass(messageElement, 'chat-message');


            var avatarElement = _this.renderer.createElement('i');


            var avatarText = _this.renderer.createText(message.sender[0]);
          

            _this.renderer.appendChild(avatarElement, avatarText);
     
            _this.renderer.setStyle(avatarElement, 'background-color', _this.getAvatarColor(message.sender));
 

            _this.renderer.appendChild(messageElement, avatarElement);
  

            var usernameElement = _this.renderer.createElement('span');
     

            var usernameText = _this.renderer.createText(message.sender);


            _this.renderer.appendChild(usernameElement, usernameText);
   
            _this.renderer.appendChild(messageElement, usernameElement);
    
        }

        var textElement = _this.renderer.createElement('p');

        var messageText = _this.renderer.createText(message.content);


        _this.renderer.appendChild(textElement, messageText);


        _this.renderer.appendChild(messageElement, textElement);


        _this.renderer.appendChild(_this.messageArea.nativeElement, messageElement);

      

        _this.messageArea.nativeElement.scrollTop = _this.messageArea.nativeElement.scrollHeight;
        

      });

      _this.stompClient.send("/app/chat.addUser", {} , JSON.stringify({sender: _this.sender, type: 'JOIN'}))

      _this.renderer.addClass(_this.connectingElement.nativeElement, 'hidden');

    }, this.onError);
   
  }

  ngOnInit(){
    this.connect();
  }

}