import React, { memo } from 'react';
import style from './i-select-vehicle-type.component.less';
import { IndexListComponent, IDrawerComponent, BackNavBarComponent } from '~/framework/components/component.module';
import { IISelectVehicleTypeProps } from './i-select-vehicle-type.interface';
import { useISelectVehicleTypeStore } from './i-select-vehicle-type.component.store';

function ISelectVehicleTypeComponent(props: IISelectVehicleTypeProps) {
  const {
    selectVehicleBrand,
    state,
    closeFactory,
    selectVehicleType,
    selectVehicleVersion,
    toSelType,
    toSelBrand,
    toSelDisplacement,
    selectVehicleConfig
  } = useISelectVehicleTypeStore(props);
  const {
    isShowFactoryDraw,
    factoryList,
    selectedFactoryItem,
    selectedBrandItem,
    isShowVersionDraw,
    versionList,
    isShowConfigDraw,
    selectedVersionItem,
    configList,
    brandList
  } = state;
  const { isShowVehicleModal, onCloseVehicleModal } = props;

  // 选择车型
  function VehicleType() {
    const sidebar = (
      <div>
        <BackNavBarComponent navText="选择车型" goBack={() => closeFactory('isShowFactoryDraw')} />
        <div className={style.selectVehicleTypeBasicListTitle}>
          <span className={style.selectVehicleTypeBasicTitleItem} onClick={toSelBrand}>
            {selectedBrandItem.value}
          </span>
        </div>
        <div className={style.deviderLine}></div>
        {factoryList.map((item: any) => {
          return (
            <div
              onClick={() => selectVehicleType(item)}
              key={item.value}
              className={`${style.selectVehicleTypeListItem} ${item.key == selectedFactoryItem.key &&
                style.selectVehicleTypeListItemSelected}`}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    );
    return (
      <IDrawerComponent show={isShowFactoryDraw} width="100%" onClose={() => closeFactory('isShowFactoryDraw')}>
        {sidebar}
      </IDrawerComponent>
    );
  }

  // 选择车辆系列
  function VehicleVersion() {
    const sidebar = (
      <div className="select-vehicle-type--basic-list">
        <BackNavBarComponent navText="选择车系" goBack={() => closeFactory('isShowVersionDraw')} />
        <div className={style.selectVehicleTypeBasicListTitle}>
          <span className={style.selectVehicleTypeBasicTitleItem} onClick={toSelBrand}>
            {selectedBrandItem.value}
          </span>
          <span> &gt; </span>
          <span className={style.selectVehicleTypeBasicTitleItem} onClick={toSelType}>
            {selectedFactoryItem.value}
          </span>
        </div>
        <div className={style.deviderLine}></div>
        <div className="basic-list">
          {versionList.map((item: any) => {
            return (
              <div
                key={item.key}
                onClick={() => selectVehicleVersion(item)}
                className={`${style.basicListListItem} ${item.key == selectedFactoryItem.key &&
                  style.basicListListItemSelected}`}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    );
    return (
      <IDrawerComponent
        show={isShowVersionDraw}
        width="100%"
        onClose={() => closeFactory('isShowVersionDraw')}
        className="select-vehicle-type--type-drawer"
      >
        {sidebar}
      </IDrawerComponent>
    );
  }

  //选择车辆配置
  function VehicleConfig() {
    const sidebar = (
      <div className="select-vehicle-type--basic-list">
        <BackNavBarComponent navText="选择车辆配置" goBack={() => closeFactory('isShowConfigDraw')} />{' '}
        <div className={style.selectVehicleTypeBasicListTitle}>
          <span className={style.selectVehicleTypeBasicTitleItem} onClick={toSelBrand}>
            {selectedBrandItem.value}
          </span>
          <span> &gt; </span>
          <span className={style.selectVehicleTypeBasicTitleItem} onClick={toSelType}>
            {selectedFactoryItem.value}
          </span>
          <span> &gt; </span>
          <span className={style.selectVehicleTypeBasicTitleItem} onClick={toSelDisplacement}>
            {selectedVersionItem.value}
          </span>
        </div>
        <div className={style.deviderLine}></div>
        <div className="basic-list">
          {configList.map((item: any) => {
            return (
              <div
                key={item.key}
                onClick={() => selectVehicleConfig(item)}
                className={`${style.basicListListItem} ${item.key == selectedFactoryItem.key &&
                  style.basicListListItemSelected}`}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    );
    return (
      <IDrawerComponent show={isShowConfigDraw} width="100%" onClose={() => closeFactory('isShowConfigDraw')}>
        {sidebar}
      </IDrawerComponent>
    );
  }
  const RenderVehicleType = memo(VehicleType);
  const RenderVehicleVersion = memo(VehicleVersion);
  const RenderVehicleConfig = memo(VehicleConfig);
  return (
    <div className={style.selectVehicleType}>
      <IDrawerComponent show={isShowVehicleModal} width="100%">
        <BackNavBarComponent navText="选择车辆配置" goBack={() => onCloseVehicleModal()} />
        <IndexListComponent list={brandList} selectVehicleBrand={selectVehicleBrand}></IndexListComponent>
      </IDrawerComponent>
      {<RenderVehicleType />}
      {<RenderVehicleVersion />}
      {<RenderVehicleConfig />}
    </div>
  );
}

export default ISelectVehicleTypeComponent;
