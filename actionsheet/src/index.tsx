import { Actionsheet as ActionsheetMain } from './Actionsheet';
import ActionsheetContent from './ActionsheetContent';
import { ActionsheetItem } from './ActionsheetItem';
import { ActionsheetItemText } from './ActionsheetItemText';
import ActionsheetBackdrop from './ActionsheetBackdrop';
import ActionsheetDragIndicator from './ActionsheetDragIndicator';
import { ActionsheetDragIndicatorWrapper } from './ActionsheetDragIndicatorWrapper';
import { ActionsheetScrollView } from './ActionsheetScrollView';
import { ActionsheetVirtualizedList } from './ActionsheetVirtualizedList';

import type { IActionsheetComponentType } from './types';
import { ActionsheetFlatList } from './ActionsheetFlatList';
import { ActionsheetSectionList } from './ActionsheetSectionList';
import { ActionsheetSectionHeaderText } from './ActionsheetSectionHeaderText';
import { ActionsheetIcon } from './ActionsheetIcon';

export function createActionsheet<
  ActionsheetProps,
  BackdropProps,
  ItemProps,
  ItemTextProps,
  DragIndicatorProps,
  IndicatorWrapperProps,
  ContentProps,
  ScrollViewProps,
  VirtualizedListProps,
  FlatListProps,
  SectionListProps,
  SectionHeaderTextProps,
  IconProps
>({
  Root,
  Backdrop,
  Item,
  ItemText,
  DragIndicator,
  IndicatorWrapper,
  Content,
  ScrollView,
  VirtualizedList,
  FlatList,
  SectionList,
  SectionHeaderText,
  Icon,
}: {
  Root: React.ComponentType<ActionsheetProps>;
  Backdrop: React.ComponentType<BackdropProps>;
  Item: React.ComponentType<ItemProps>;
  Icon: React.ComponentType<IconProps>;
  ItemText: React.ComponentType<ItemTextProps>;
  DragIndicator: React.ComponentType<DragIndicatorProps>;
  IndicatorWrapper: React.ComponentType<IndicatorWrapperProps>;
  Content: React.ComponentType<ContentProps>;
  ScrollView: React.ComponentType<ScrollViewProps>;
  VirtualizedList: React.ComponentType<VirtualizedListProps>;
  FlatList: React.ComponentType<FlatListProps>;
  SectionList: React.ComponentType<SectionListProps>;
  SectionHeaderText: React.ComponentType<SectionHeaderTextProps>;
}) {
  const Actionsheet = ActionsheetMain(Root) as any;
  Actionsheet.Content = ActionsheetContent(Content);
  Actionsheet.Item = ActionsheetItem(Item);
  Actionsheet.Icon = ActionsheetIcon(Icon);
  Actionsheet.ItemText = ActionsheetItemText(ItemText);
  Actionsheet.DragIndicator = ActionsheetDragIndicator(DragIndicator);
  Actionsheet.Backdrop = ActionsheetBackdrop(Backdrop);
  Actionsheet.DragIndicatorWrapper =
    ActionsheetDragIndicatorWrapper(IndicatorWrapper);
  Actionsheet.ScrollView = ActionsheetScrollView(ScrollView);
  Actionsheet.VirtualizedList = ActionsheetVirtualizedList(VirtualizedList);
  Actionsheet.FlatList = ActionsheetFlatList(FlatList);
  Actionsheet.SectionList = ActionsheetSectionList(SectionList);
  Actionsheet.SectionHeaderText =
    ActionsheetSectionHeaderText(SectionHeaderText);

  return Actionsheet as IActionsheetComponentType<
    ActionsheetProps,
    BackdropProps,
    ItemProps,
    ItemTextProps,
    DragIndicatorProps,
    IndicatorWrapperProps,
    ContentProps,
    ScrollViewProps,
    VirtualizedListProps,
    FlatListProps,
    SectionListProps,
    SectionHeaderTextProps,
    IconProps
  >;
}
