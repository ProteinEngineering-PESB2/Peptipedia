from litestar import get
from litestar.controller import Controller
from litestar.di import Provide

from peptipedia.database.models import Activity
from peptipedia.services.activities.dtos import ActivityReadDTO
from peptipedia.services.activities.repositories import ActivityRepository, provide_acitvities_repository


class ActivityController(Controller):
    path = "/activities"
    dependencies = {
        "activities_repo": Provide(provide_acitvities_repository)
    }
    return_dto = ActivityReadDTO

    @get()
    async def list_acitivites(self, activities_repo: ActivityRepository) -> list[Activity]:
        return await activities_repo.list_with_extra_info()
