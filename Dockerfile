FROM abernix/meteord:node-8.9.1-base
MAINTAINER IDgis bv

COPY ./ /app
COPY pop_edit.sh $METEORD_DIR/lib

RUN bash $METEORD_DIR/lib/install_meteor.sh
RUN bash $METEORD_DIR/lib/pop_edit.sh