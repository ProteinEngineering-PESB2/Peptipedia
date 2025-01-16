from litestar.controller import Controller
from litestar.di import Provide

from peptipedia.services.activities.repositories import provide_acitvities_repository


class ActivityController(Controller):
    path = "/activities"
    dependencies = {
        "activities_repo": Provide(provide_acitvities_repository)
    }

    # @get("")