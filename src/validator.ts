import {
  IntegrationExecutionContext,
  IntegrationValidationError,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from './config';
import { CoreClient } from './kubernetes/clients/core';

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;
  if (
    !config.accessType ||
    !config.namespace ||
    !config.jupiteroneAccountId ||
    !config.jupiteroneApiKey ||
    !config.integrationInstanceId
    // This has a default value.
    // typeof config.loadKubernetesConfigFromDefault !== 'boolean'
  ) {
    throw new IntegrationValidationError(
      'Config requires all of {accessType, namespace, jupiteroneAccountId, jupiteroneApiKey, integrationInstanceId}',
    );
  }

  const coreClient = new CoreClient(config);
  await coreClient.verifyAuthentication();
}
