from litestar.plugins.sqlalchemy import (
    AsyncSessionConfig,
    EngineConfig,
    SQLAlchemyAsyncConfig,
    SQLAlchemyPlugin,
)

from peptipedia.config import settings

sqlalchemy_config = SQLAlchemyAsyncConfig(
    connection_string=settings.database_url.unicode_string(),
    engine_config=EngineConfig(echo=False),
    session_config=AsyncSessionConfig(expire_on_commit=False),
)

sqlalchemy_plugin = SQLAlchemyPlugin(sqlalchemy_config)
