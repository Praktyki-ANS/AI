from prometheus_client import Counter, Histogram, start_http_server
import time

REQUEST_COUNT = Counter('request_count', 'Liczba żądań API', ['endpoint', 'method'])
REQUEST_LATENCY = Histogram('request_latency_seconds', 'Czas odpowiedzi API', ['endpoint'])

start_http_server(8001)

def monitor_request(endpoint: str, method: str, latency: float):
    REQUEST_COUNT.labels(endpoint=endpoint, method=method).inc()
    REQUEST_LATENCY.labels(endpoint=endpoint).observe(latency)