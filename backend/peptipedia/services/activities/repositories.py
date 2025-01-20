from advanced_alchemy.repository import SQLAlchemyAsyncRepository
from sqlalchemy.ext.asyncio import AsyncSession

from peptipedia.database.models import Activity


class ActivityRepository(SQLAlchemyAsyncRepository[Activity]):
    model_type = Activity

    async def list_with_extra_info(self):
        return await self.list()


async def provide_acitvities_repository(db_session: AsyncSession) -> ActivityRepository:
    return ActivityRepository(session=db_session)
