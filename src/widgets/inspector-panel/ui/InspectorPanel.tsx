import { BlockInspector } from '@/features/block-inspector';
import { selectGlobalSettings, selectSelectedBlock } from '@/entities/email/model/selectors';
import { useAppSelector } from '@/app/store/hooks';
import { Panel } from '@/shared/ui/Panel';

export const InspectorPanel = () => {
  const selectedBlock = useAppSelector(selectSelectedBlock);
  const globalSettings = useAppSelector(selectGlobalSettings);

  return (
    <Panel title="Инспектор настроек">
      <BlockInspector block={selectedBlock} settings={globalSettings} />
    </Panel>
  );
};