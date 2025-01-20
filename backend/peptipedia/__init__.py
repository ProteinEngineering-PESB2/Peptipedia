from litestar import Litestar

from peptipedia.config import settings
from peptipedia.plugins import sqlalchemy_plugin
from peptipedia.services.router import router

app = Litestar(
    route_handlers=[router],
    plugins=[sqlalchemy_plugin],
    debug=settings.debug
)
