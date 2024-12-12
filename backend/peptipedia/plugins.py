from advanced_alchemy.config import EngineConfig, SQLAlchemyAsyncConfig
from advanced_alchemy.extensions.litestar import SQLAlchemyPlugin

from peptipedia.config import settings

sqlalchemy_config = SQLAlchemyAsyncConfig(
    connection_string=settings.database_url,
    engine_config=EngineConfig(echo=False),
)

sqlalchemy_plugin = SQLAlchemyPlugin(sqlalchemy_config)
