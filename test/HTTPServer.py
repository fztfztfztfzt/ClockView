import SocketServer
import SimpleHTTPServer

httpServer = SocketServer.TCPServer(("",8888),SimpleHTTPServer.SimpleHTTPRequestHandler)
httpServer.serve_forever()
