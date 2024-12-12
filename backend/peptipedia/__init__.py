from litestar import Litestar

from peptipedia.config import settings
from peptipedia.plugins import sqlalchemy_plugin

app = Litestar(
    plugins=[sqlalchemy_plugin],
    debug=settings.debug
)