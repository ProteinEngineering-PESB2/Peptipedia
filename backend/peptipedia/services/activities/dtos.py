from advanced_alchemy.extensions.litestar import SQLAlchemyDTO, SQLAlchemyDTOConfig

from peptipedia.database.models import Activity


class ActivityReadDTO(SQLAlchemyDTO[Activity]):
    config = SQLAlchemyDTOConfig(exclude={"children"})
