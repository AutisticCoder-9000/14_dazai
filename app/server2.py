from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

class CORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

TCPServer(('', 8000), CORSHandler).serve_forever()
