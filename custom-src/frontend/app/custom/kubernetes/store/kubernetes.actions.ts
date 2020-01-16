import { SortDirection } from '@angular/material';

import { MetricQueryConfig, MetricsAction, MetricsChartAction } from '../../../../../store/src/actions/metrics.actions';
import { getPaginationKey } from '../../../../../store/src/actions/pagination.actions';
import { PaginatedAction, PaginationParam } from '../../../../../store/src/types/pagination.types';
import { EntityRequestAction } from '../../../../../store/src/types/request.types';
import {
  KUBERNETES_ENDPOINT_TYPE,
  kubernetesAppsEntityType,
  kubernetesDashboardEntityType,
  kubernetesDeploymentsEntityType,
  kubernetesEntityFactory,
  kubernetesNamespacesEntityType,
  kubernetesNodesEntityType,
  kubernetesPodsEntityType,
  kubernetesServicesEntityType,
  kubernetesStatefulSetsEntityType,
} from '../kubernetes-entity-factory';

export const GET_RELEASE_POD_INFO = '[KUBERNETES Endpoint] Get Release Pods Info';
export const GET_RELEASE_POD_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Release Pods Info Success';
export const GET_RELEASE_POD_INFO_FAILURE = '[KUBERNETES Endpoint] Get Release Pods Info Failure';

export const GET_NODES_INFO = '[KUBERNETES Endpoint] Get Nodes Info';
export const GET_NODES_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Nodes Info Success';
export const GET_NODES_INFO_FAILURE = '[KUBERNETES Endpoint] Get Nodes Info Failure';

export const GET_NODE_INFO = '[KUBERNETES Endpoint] Get Node Info';
export const GET_NODE_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Node Info Success';
export const GET_NODE_INFO_FAILURE = '[KUBERNETES Endpoint] Get Node Info Failure';

export const GET_POD_INFO = '[KUBERNETES Endpoint] Get Pod Info';
export const GET_POD_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Pod Info Success';
export const GET_POD_INFO_FAILURE = '[KUBERNETES Endpoint] Get Pod Info Failure';

export const GET_PODS_ON_NODE_INFO = '[KUBERNETES Endpoint] Get Pods on Node Info';
export const GET_PODS_ON_NODE_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Pods on Node Success';
export const GET_PODS_ON_NODE_INFO_FAILURE = '[KUBERNETES Endpoint] Get Pods on Node Failure';

export const GET_PODS_IN_NAMESPACE_INFO = '[KUBERNETES Endpoint] Get Pods in Namespace Info';
export const GET_PODS_IN_NAMEPSACE_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Pods in Namespace Success';
export const GET_PODS_IN_NAMEPSACE_INFO_FAILURE = '[KUBERNETES Endpoint] Get Pods in Namespace Failure';

export const GET_SERVICES_IN_NAMESPACE_INFO = '[KUBERNETES Endpoint] Get Services in Namespace Info';
export const GET_SERVICES_IN_NAMESPACE_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Services in Namespace Success';
export const GET_SERVICES_IN_NAMESPACE_INFO_FAILURE = '[KUBERNETES Endpoint] Get Services in Namespace Failure';

export const GET_NAMESPACES_INFO = '[KUBERNETES Endpoint] Get Namespaces Info';
export const GET_NAMESPACES_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Namespaces Info Success';
export const GET_NAMESPACES_INFO_FAILURE = '[KUBERNETES Endpoint] Get Namespaces Info Failure';

export const GET_NAMESPACE_INFO = '[KUBERNETES Endpoint] Get Namespace Info';
export const GET_NAMESPACE_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Namespace Info Success';
export const GET_NAMESPACE_INFO_FAILURE = '[KUBERNETES Endpoint] Get Namespace Info Failure';

export const GET_KUBERNETES_APP_INFO = '[KUBERNETES Endpoint] Get Kubernetes App Info';
export const GET_KUBERNETES_APP_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Kubernetes App Info Success';
export const GET_KUBERNETES_APP_INFO_FAILURE = '[KUBERNETES Endpoint] Get Kubernetes App Info Failure';

export const GET_SERVICE_INFO = '[KUBERNETES Endpoint] Get Services Info';
export const GET_SERVICE_INFO_SUCCESS = '[KUBERNETES Endpoint] Get Services Info Success';
export const GET_SERVICE_INFO_FAILURE = '[KUBERNETES Endpoint] Get Services Info Failure';

export const GET_KUBE_POD = '[KUBERNETES Endpoint] Get K8S Pod Info';
export const GET_KUBE_POD_SUCCESS = '[KUBERNETES Endpoint] Get K8S Pod  Success';
export const GET_KUBE_POD_FAILURE = '[KUBERNETES Endpoint] Get K8S Pod  Failure';

export const GET_KUBE_STATEFULSETS = '[KUBERNETES Endpoint] Get K8S Stateful Sets Info';
export const GET_KUBE_STATEFULSETS_SUCCESS = '[KUBERNETES Endpoint] Get Stateful Sets Success';
export const GET_KUBE_STATEFULSETS_FAILURE = '[KUBERNETES Endpoint] Get Stateful Sets Failure';

export const GET_KUBE_DEPLOYMENT = '[KUBERNETES Endpoint] Get K8S Deployments Info';
export const GET_KUBE_DEPLOYMENT_SUCCESS = '[KUBERNETES Endpoint] Get Deployments Success';
export const GET_KUBE_DEPLOYMENT_FAILURE = '[KUBERNETES Endpoint] Get Deployments Failure';

export const GET_KUBE_DASHBOARD = '[KUBERNETES Endpoint] Get K8S Dashboard Info';
export const GET_KUBE_DASHBOARD_SUCCESS = '[KUBERNETES Endpoint] Get Dashboard Success';
export const GET_KUBE_DASHBOARD_FAILURE = '[KUBERNETES Endpoint] Get Dashboard Failure';


const sortPodsByName = {
  'order-direction': 'desc' as SortDirection,
  'order-direction-field': 'name'
};

export interface KubeAction extends EntityRequestAction {
  kubeGuid: string;
}
export interface KubePaginationAction extends PaginatedAction, KubeAction { }

export class GetKubernetesReleasePods implements KubePaginationAction {

  constructor(public kubeGuid: string, releaseName: string) {
    this.paginationKey = getPaginationKey(kubernetesPodsEntityType, `release-${releaseName}`, kubeGuid);
    this.initialParams = {
      labelSelector: `app.kubernetes.io/instance=${releaseName}`,
      ...sortPodsByName
    };
  }
  initialParams: PaginationParam;
  type = GET_RELEASE_POD_INFO;
  entityType = kubernetesPodsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesPodsEntityType)];
  params: { labelSelector: string; };
  actions = [
    GET_RELEASE_POD_INFO,
    GET_RELEASE_POD_INFO_SUCCESS,
    GET_RELEASE_POD_INFO_FAILURE
  ];
  paginationKey: string;
}

export class KubeHealthCheck implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = kubeGuid + '-health-check';
  }
  initialParams = {
    limit: 1
  };
  type = GET_NODES_INFO;
  entityType = kubernetesNodesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesNodesEntityType)];
  actions = [
    GET_NODES_INFO,
    GET_NODES_INFO_SUCCESS,
    GET_NODES_INFO_FAILURE
  ];
  paginationKey: string;
}

export class GetKubernetesNodes implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesNodesEntityType, kubeGuid);
  }
  type = GET_NODES_INFO;
  entityType = kubernetesNodesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesNodesEntityType)];
  actions = [
    GET_NODES_INFO,
    GET_NODES_INFO_SUCCESS,
    GET_NODES_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    'order-direction': 'desc' as SortDirection,
    'order-direction-field': 'name'
  };
}

export class GetKubernetesNode implements KubeAction {
  constructor(public nodeName: string, public kubeGuid: string) {
  }
  type = GET_NODE_INFO;
  entityType = kubernetesNodesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesNodesEntityType)];

  actions = [
    GET_NODE_INFO,
    GET_NODE_INFO_SUCCESS,
    GET_NODE_INFO_FAILURE
  ];
}

export class GetKubernetesNamespace implements KubeAction {
  constructor(public namespaceName: string, public kubeGuid: string) {
  }
  type = GET_NAMESPACE_INFO;
  entityType = kubernetesNamespacesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesNamespacesEntityType)];

  actions = [
    GET_NAMESPACE_INFO,
    GET_NAMESPACE_INFO_SUCCESS,
    GET_NAMESPACE_INFO_FAILURE
  ];
}

export class GetKubernetesPods implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesPodsEntityType, 'k8', kubeGuid);
  }
  type = GET_POD_INFO;
  entityType = kubernetesPodsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesPodsEntityType)];
  actions = [
    GET_POD_INFO,
    GET_POD_INFO_SUCCESS,
    GET_POD_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    ...sortPodsByName
  };
}

export class GetKubernetesPodsOnNode implements PaginatedAction, KubeAction {
  constructor(public kubeGuid: string, public nodeName: string) {
    this.paginationKey = getPaginationKey(kubernetesPodsEntityType, `node-${nodeName}`, kubeGuid);
    this.initialParams = {
      fieldSelector: `spec.nodeName=${nodeName}`,
      ...sortPodsByName
    };
  }
  type = GET_PODS_ON_NODE_INFO;
  entityType = kubernetesPodsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesPodsEntityType)];
  actions = [
    GET_PODS_ON_NODE_INFO,
    GET_PODS_ON_NODE_INFO_SUCCESS,
    GET_PODS_ON_NODE_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams: PaginationParam;
}

export class GetKubernetesServicesInNamespace implements PaginatedAction, KubeAction {
  constructor(public kubeGuid: string, public namespaceName: string) {
    this.paginationKey = getPaginationKey(kubernetesPodsEntityType, `ns-${namespaceName}`, kubeGuid);
  }
  type = GET_SERVICES_IN_NAMESPACE_INFO;
  entityType = kubernetesServicesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesServicesEntityType)];
  actions = [
    GET_SERVICES_IN_NAMESPACE_INFO,
    GET_SERVICES_IN_NAMESPACE_INFO_SUCCESS,
    GET_SERVICES_IN_NAMESPACE_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    ...sortPodsByName
  };
}

export class GetKubernetesPodsInNamespace implements PaginatedAction, KubeAction {
  constructor(public kubeGuid: string, public namespaceName: string) {
    this.paginationKey = getPaginationKey(kubernetesPodsEntityType, `ns-${namespaceName}`, kubeGuid);
  }
  type = GET_PODS_IN_NAMESPACE_INFO;
  entityType = kubernetesPodsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesPodsEntityType)];
  actions = [
    GET_PODS_IN_NAMESPACE_INFO,
    GET_PODS_IN_NAMEPSACE_INFO_SUCCESS,
    GET_PODS_IN_NAMEPSACE_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    ...sortPodsByName
  };
}

export class GetKubernetesNamespaces implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesNamespacesEntityType, kubeGuid || 'all');
  }
  type = GET_NAMESPACES_INFO;
  entityType = kubernetesNamespacesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesNamespacesEntityType)];
  actions = [
    GET_NAMESPACES_INFO,
    GET_NAMESPACES_INFO_SUCCESS,
    GET_NAMESPACES_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    'order-direction': 'desc' as SortDirection,
    'order-direction-field': 'name'
  };
}

export class GetKubernetesApps implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesAppsEntityType, kubeGuid);
  }
  type = GET_KUBERNETES_APP_INFO;
  entityType = kubernetesAppsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesAppsEntityType)];
  actions = [
    GET_KUBERNETES_APP_INFO,
    GET_KUBERNETES_APP_INFO_SUCCESS,
    GET_KUBERNETES_APP_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    'order-direction': 'desc' as SortDirection,
    'order-direction-field': 'name'
  };
}

export class GetKubernetesServices implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesServicesEntityType, kubeGuid);
  }
  type = GET_SERVICE_INFO;
  entityType = kubernetesServicesEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesServicesEntityType)];
  actions = [
    GET_SERVICE_INFO,
    GET_SERVICE_INFO_SUCCESS,
    GET_SERVICE_INFO_FAILURE
  ];
  paginationKey: string;
  initialParams = {
    'order-direction': 'desc' as SortDirection,
    'order-direction-field': 'name'
  };
}

export class GetKubernetesPod implements KubeAction {
  constructor(public podName, public namespaceName, public kubeGuid) {
  }
  type = GET_KUBE_POD;
  entityType = kubernetesPodsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesPodsEntityType)];
  actions = [
    GET_KUBE_POD,
    GET_KUBE_POD_SUCCESS,
    GET_KUBE_POD_FAILURE
  ];
}

export class GetKubernetesStatefulSets implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesStatefulSetsEntityType, kubeGuid);
  }
  type = GET_KUBE_STATEFULSETS;
  entityType = kubernetesStatefulSetsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesStatefulSetsEntityType)];
  actions = [
    GET_KUBE_STATEFULSETS,
    GET_KUBE_STATEFULSETS_SUCCESS,
    GET_KUBE_STATEFULSETS_FAILURE
  ];
  paginationKey: string;
}

export class GeKubernetesDeployments implements KubePaginationAction {
  constructor(public kubeGuid) {
    this.paginationKey = getPaginationKey(kubernetesDeploymentsEntityType, kubeGuid);
  }
  type = GET_KUBE_DEPLOYMENT;
  entityType = kubernetesDeploymentsEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesDeploymentsEntityType)];
  actions = [
    GET_KUBE_DEPLOYMENT,
    GET_KUBE_DEPLOYMENT_SUCCESS,
    GET_KUBE_DEPLOYMENT_FAILURE
  ];
  paginationKey: string;
}

export class GetKubernetesDashboard implements KubeAction {
  constructor(public kubeGuid: string) {
  }
  type = GET_KUBE_DASHBOARD;
  entityType = kubernetesDashboardEntityType;
  endpointType = KUBERNETES_ENDPOINT_TYPE;
  entity = [kubernetesEntityFactory(kubernetesDashboardEntityType)];

  actions = [
    GET_KUBE_DASHBOARD,
    GET_KUBE_DASHBOARD_SUCCESS,
    GET_KUBE_DASHBOARD_FAILURE
  ];
}

function getKubeMetricsAction(guid: string) {
  return `${MetricsAction.getBaseMetricsURL()}/kubernetes/${guid}`;
}

export class FetchKubernetesMetricsAction extends MetricsAction {
  constructor(guid: string, cfGuid: string, metricQuery: string) {
    super(
      guid,
      cfGuid,
      new MetricQueryConfig(metricQuery),
      getKubeMetricsAction(guid),
      undefined,
      undefined,
      undefined,
      KUBERNETES_ENDPOINT_TYPE
    );
  }
}

export class FetchKubernetesChartMetricsAction extends MetricsChartAction {
  constructor(guid: string, cfGuid: string, metricQuery: string) {
    super(
      guid,
      cfGuid,
      new MetricQueryConfig(metricQuery),
      getKubeMetricsAction(guid),
      KUBERNETES_ENDPOINT_TYPE
    );
  }
}
