from litestar import Router

from peptipedia.services.activities.controllers import ActivityController

router = Router(path="/", route_handlers=[ActivityController])
