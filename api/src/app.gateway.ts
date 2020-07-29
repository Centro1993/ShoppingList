import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

/*
This Class serves as a Gateway for all connected clients.
 */
@WebSocketGateway({ origins: '*:*'})
export class AppGateway {

    @WebSocketServer()
    server: Server;

    public emit(event: string, room?: string | null, data?: object | string | number ) {
        if (!room) this.server.emit(event, data || null)
        else this.server.to(room).emit(event, data || null)
    }

    @SubscribeMessage('updated')
    handleEvent(@ConnectedSocket() client: Socket, data: string): string {
        client.broadcast.emit('updated')
        return data;
    }

}