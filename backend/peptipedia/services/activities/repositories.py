from advanced_alchemy.repository import SQLAlchemyAsyncRepository
from sqlalchemy.ext.asyncio import AsyncSession

from peptipedia.database.models import Activity


class ActivitiesRepository(SQLAlchemyAsyncRepository[Activity]):
    model_type = Activity


async def provide_acitvities_repository(db_session: AsyncSession) -> ActivitiesRepository:
    async with ActivitiesRepository(session=db_session) as repository:
        yield repository
