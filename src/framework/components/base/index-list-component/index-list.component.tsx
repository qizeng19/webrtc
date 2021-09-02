import * as React from 'react';
import { IIndexListProps, IndexList } from './index-list.interface';
import { List } from 'antd-mobile';
import { useIndexListStore } from './index-list.component.store';
const Item = List.Item;
//TODO: 后面添加 索引
function IndexListComponent(props: IIndexListProps) {
  const { onSelectIndexContent } = useIndexListStore(props);

  function indexes() {
    // const currentEle: any = React.useRef();
    return props.list.map((letter: IndexList) => {
      const { key, title, items } = letter;
      return (
        <div key={key}>
          <List renderHeader={() => title} className="select-city-list">
            {items.length > 0 &&
              items.map(item => {
                return (
                  <Item key={item.key} onClick={() => onSelectIndexContent(item)}>
                    {item.name}
                  </Item>
                );
              })}
          </List>
        </div>
      );
    });
  }

  const RenderIndexes = indexes();
  return (
    <div>
      {RenderIndexes}
      {/* <div className="city-label">
      <IndexNav labels={labels} moving={moving} onNavChange={this.onNavChange} />
    </div> */}
    </div>
  );
}

export default React.memo(IndexListComponent);
