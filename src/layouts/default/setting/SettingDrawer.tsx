import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import { ElDivider } from 'element-plus';
import {
  TypePicker,
  ThemeColorPicker,
  SettingFooter,
  SwitchItem,
  SelectItem,
  InputNumberItem,
} from './components';

import { AppDarkModeToggle } from '/@/components/Application';

import { MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
// import { useI18n } from '/@/hooks/web/useI18n';

import { baseHandler } from './handler';

import {
  HandlerEnum,
  contentModeOptions,
  topMenuAlignOptions,
  getMenuTriggerOptions,
  routerTransitionOptions,
  menuTypeList,
  mixSidebarTriggerOptions,
} from './enum';

import {
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  APP_PRESET_COLOR_LIST,
} from '/@/settings/designSetting';

// const { t } = useI18n();

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const {
      getContentMode,
      getShowFooter,
      getShowBreadCrumb,
      getShowBreadCrumbIcon,
      getShowLogo,
      getFullContent,
      getColorWeak,
      getGrayMode,
      getLockTime,
      getShowDarkModeToggle,
      getThemeColor,
    } = useRootSetting();

    const { getOpenPageLoading, getBasicTransition, getEnableTransition, getOpenNProgress } =
      useTransitionSetting();

    const {
      getIsHorizontal,
      getShowMenu,
      getMenuType,
      getTrigger,
      getCollapsedShowTitle,
      getMenuFixed,
      getCollapsed,
      getCanDrag,
      getTopMenuAlign,
      getAccordion,
      getMenuWidth,
      getMenuBgColor,
      getIsTopMenu,
      getSplit,
      getIsMixSidebar,
      getCloseMixSidebarOnChange,
      getMixSideTrigger,
      getMixSideFixed,
    } = useMenuSetting();
    console.log('getCollapsed', getCollapsed);

    const {
      getShowHeader,
      getFixed: getHeaderFixed,
      getHeaderBgColor,
      getShowSearch,
    } = useHeaderSetting();

    const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

    const getShowMenuRef = computed(() => {
      return unref(getShowMenu) && !unref(getIsHorizontal);
    });

    function renderSidebar() {
      return (
        <>
          <TypePicker
            menuTypeList={menuTypeList}
            handler={(item: typeof menuTypeList[0]) => {
              baseHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
                split: unref(getIsHorizontal) ? false : undefined,
              });
            }}
            def={unref(getMenuType)}
          />
        </>
      );
    }

    function renderHeaderTheme() {
      return (
        <ThemeColorPicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }

    function renderSiderTheme() {
      return (
        <ThemeColorPicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      );
    }

    function renderMainTheme() {
      return (
        <ThemeColorPicker
          colorList={APP_PRESET_COLOR_LIST}
          def={unref(getThemeColor)}
          event={HandlerEnum.CHANGE_THEME_COLOR}
        />
      );
    }

    /**
     * @description:
     */
    function renderFeatures() {
      let triggerDef = unref(getTrigger);

      const triggerOptions = getMenuTriggerOptions(unref(getSplit));
      const some = triggerOptions.some((item) => item.value === triggerDef);
      if (!some) {
        triggerDef = TriggerEnum.FOOTER;
      }

      return (
        <>
          <SwitchItem
            title={'splitMenu'}
            event={HandlerEnum.MENU_SPLIT}
            def={unref(getSplit)}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) !== MenuTypeEnum.MIX}
          />
          <SwitchItem
            title={'mixSidebarFixed'}
            event={HandlerEnum.MENU_FIXED_MIX_SIDEBAR}
            def={unref(getMixSideFixed)}
            disabled={!unref(getIsMixSidebar)}
          />

          <SwitchItem
            title={'closeMixSidebarOnChange'}
            event={HandlerEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE}
            def={unref(getCloseMixSidebarOnChange)}
            disabled={!unref(getIsMixSidebar)}
          />
          <SwitchItem
            title={'menuCollapse'}
            event={HandlerEnum.MENU_COLLAPSED}
            def={unref(getCollapsed)}
            disabled={!unref(getShowMenuRef)}
          />

          <SwitchItem
            title={'menuDrag'}
            event={HandlerEnum.MENU_HAS_DRAG}
            def={unref(getCanDrag)}
            disabled={!unref(getShowMenuRef)}
          />
          <SwitchItem
            title={'menuSearch'}
            event={HandlerEnum.HEADER_SEARCH}
            def={unref(getShowSearch)}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem
            title={'menuAccordion'}
            event={HandlerEnum.MENU_ACCORDION}
            def={unref(getAccordion)}
            disabled={!unref(getShowMenuRef)}
          />

          <SwitchItem
            title={'collapseMenuDisplayName'}
            event={HandlerEnum.MENU_COLLAPSED_SHOW_TITLE}
            def={unref(getCollapsedShowTitle)}
            disabled={!unref(getShowMenuRef) || !unref(getCollapsed) || unref(getIsMixSidebar)}
          />

          <SwitchItem
            title={'fixedHeader'}
            event={HandlerEnum.HEADER_FIXED}
            def={unref(getHeaderFixed)}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem
            title={'fixedSideBar'}
            event={HandlerEnum.MENU_FIXED}
            def={unref(getMenuFixed)}
            disabled={!unref(getShowMenuRef) || unref(getIsMixSidebar)}
          />
          <SelectItem
            title={'mixSidebarTrigger'}
            event={HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR}
            def={unref(getMixSideTrigger)}
            options={mixSidebarTriggerOptions}
            disabled={!unref(getIsMixSidebar)}
          />
          <SelectItem
            title={'topMenuLayout'}
            event={HandlerEnum.MENU_TOP_ALIGN}
            def={unref(getTopMenuAlign)}
            options={topMenuAlignOptions}
            disabled={
              !unref(getShowHeader) ||
              unref(getSplit) ||
              (!unref(getIsTopMenu) && !unref(getSplit)) ||
              unref(getIsMixSidebar)
            }
          />
          <SelectItem
            title={'menuCollapseButton'}
            event={HandlerEnum.MENU_TRIGGER}
            def={triggerDef}
            options={triggerOptions}
            disabled={!unref(getShowMenuRef) || unref(getIsMixSidebar)}
          />
          <SelectItem
            title={'contentMode'}
            event={HandlerEnum.CONTENT_MODE}
            def={unref(getContentMode)}
            options={contentModeOptions}
          />
          <InputNumberItem
            title={'autoScreenLock'}
            min={0}
            event={HandlerEnum.LOCK_TIME}
            defaultValue={unref(getLockTime)}
            formatter={(value: string) => {
              return parseInt(value) === 0 ? `0(${'notAutoScreenLock'})` : `${value}${'minute'}`;
            }}
          />
          <InputNumberItem
            title={'expandedMenuWidth'}
            max={600}
            min={100}
            step={10}
            event={HandlerEnum.MENU_WIDTH}
            disabled={!unref(getShowMenuRef)}
            defaultValue={unref(getMenuWidth)}
            formatter={(value: string) => `${parseInt(value)}px`}
          />
        </>
      );
    }

    function renderContent() {
      return (
        <>
          <SwitchItem
            title={'breadcrumb'}
            event={HandlerEnum.SHOW_BREADCRUMB}
            def={unref(getShowBreadCrumb)}
            disabled={!unref(getShowHeader)}
          />

          <SwitchItem
            title={'breadcrumbIcon'}
            event={HandlerEnum.SHOW_BREADCRUMB_ICON}
            def={unref(getShowBreadCrumbIcon)}
            disabled={!unref(getShowHeader)}
          />

          <SwitchItem
            title={'tabs'}
            event={HandlerEnum.TABS_SHOW}
            def={unref(getShowMultipleTab)}
          />

          <SwitchItem
            title={'tabsRedoBtn'}
            event={HandlerEnum.TABS_SHOW_REDO}
            def={unref(getShowRedo)}
            disabled={!unref(getShowMultipleTab)}
          />

          <SwitchItem
            title={'tabsQuickBtn'}
            event={HandlerEnum.TABS_SHOW_QUICK}
            def={unref(getShowQuick)}
            disabled={!unref(getShowMultipleTab)}
          />
          <SwitchItem
            title={'tabsFoldBtn'}
            event={HandlerEnum.TABS_SHOW_FOLD}
            def={unref(getShowFold)}
            disabled={!unref(getShowMultipleTab)}
          />

          <SwitchItem
            title={'sidebar'}
            event={HandlerEnum.MENU_SHOW_SIDEBAR}
            def={unref(getShowMenu)}
            disabled={unref(getIsHorizontal)}
          />

          <SwitchItem title={'header'} event={HandlerEnum.HEADER_SHOW} def={unref(getShowHeader)} />
          <SwitchItem
            title="Logo"
            event={HandlerEnum.SHOW_LOGO}
            def={unref(getShowLogo)}
            disabled={unref(getIsMixSidebar)}
          />
          <SwitchItem title={'footer'} event={HandlerEnum.SHOW_FOOTER} def={unref(getShowFooter)} />
          <SwitchItem
            title={'fullContent'}
            event={HandlerEnum.FULL_CONTENT}
            def={unref(getFullContent)}
          />

          <SwitchItem title={'grayMode'} event={HandlerEnum.GRAY_MODE} def={unref(getGrayMode)} />

          <SwitchItem
            title={'colorWeak'}
            event={HandlerEnum.COLOR_WEAK}
            def={unref(getColorWeak)}
          />
        </>
      );
    }

    function renderTransition() {
      return (
        <>
          <SwitchItem
            title={'progress'}
            event={HandlerEnum.OPEN_PROGRESS}
            def={unref(getOpenNProgress)}
          />
          <SwitchItem
            title={'switchLoading'}
            event={HandlerEnum.OPEN_PAGE_LOADING}
            def={unref(getOpenPageLoading)}
          />

          <SwitchItem
            title={'switchAnimation'}
            event={HandlerEnum.OPEN_ROUTE_TRANSITION}
            def={unref(getEnableTransition)}
          />

          <SelectItem
            title={'animationType'}
            event={HandlerEnum.ROUTER_TRANSITION}
            def={unref(getBasicTransition)}
            options={routerTransitionOptions}
            disabled={!unref(getEnableTransition)}
          />
        </>
      );
    }

    return () => (
      <BasicDrawer {...attrs} title={'drawerTitle'} width={330} class="setting-drawer">
        {unref(getShowDarkModeToggle) && <ElDivider>{() => 'darkMode'}</ElDivider>}
        {unref(getShowDarkModeToggle) && <AppDarkModeToggle class="mx-auto" />}
        <ElDivider>{() => 'navMode'}</ElDivider>
        {renderSidebar()}
        <ElDivider>{() => 'sysTheme'}</ElDivider>
        {renderMainTheme()}
        <ElDivider>{() => 'headerTheme'}</ElDivider>
        {renderHeaderTheme()}
        <ElDivider>{() => 'sidebarTheme'}</ElDivider>
        {renderSiderTheme()}
        <ElDivider>{() => 'interfaceFunction'}</ElDivider>
        {renderFeatures()}
        <ElDivider>{() => 'interfaceDisplay'}</ElDivider>
        {renderContent()}
        <ElDivider>{() => 'animation'}</ElDivider>
        {renderTransition()}
        <ElDivider />
        <SettingFooter />
      </BasicDrawer>
    );
  },
});
