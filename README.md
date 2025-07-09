# eks-node-api-demo

This is a simple Node.js API demo designed to run on Amazon EKS (Elastic Kubernetes Service). It provides a basic structure for building and deploying a Node.js application in a Kubernetes environment.

## Features
- Basic Express.js setup
- Health check endpoint
- Dockerfile for containerization
- Kubernetes deployment and service configuration
- Helm for `nginx ingress` and `kong` installation

## Getting Started

### Prerequisites
- Docker
- Kubernetes cluster (EKS recommended) and ERC (Elastic Container Registry)
- kubectl configured to access your cluster
- Helm for managing Kubernetes applications

### Project Structure
```
eks-node-api-demo/
├── src/
│   ├── app.js          # Main application file
│   ├── Dockerfile      # Dockerfile for building the application image
│   └── package.json    # Node.js dependencies and scripts
├── k8s/
│   ├── deployment.yaml # Kubernetes deployment configuration
│   └── service.yaml    # Kubernetes service configuration
│   └── ingress.yaml    # Kubernetes ingress configuration
│   └── kong.yaml       # Kong ingress configuration
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

### Installation

1. Clone the repository:
    ```bash
    git clone git@github.com:LeaoSomogyi/eks-node-api-demo.git
    ```

2. Build the Docker image and push it to your ECR repository:

   ```bash
   docker build -t eks-node-api-demo .
   docker tag eks-node-api-demo:latest <your-ecr-repo-uri>:latest
   docker push <your-ecr-repo-uri>:latest
   ```

3. Install NGINX Ingress Controller using Helm:

    ```bash
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update
    helm install ingress-nginx ingress-nginx/ingress-nginx --namespace app --create-namespace   
    ```

4. Install Kong Ingress Controller using Helm:

    ```bash
    helm repo add kong https://charts.konghq.com
    helm repo update
    helm install kong kong/kong \
        --namespace app \
        --set ingressController.installCRDs=true \
        --set proxy.type=LoadBalancer \
        --set admin.enabled=false \
        --set env.database=off
    ```

5. Deploy the application to EKS, remember to replace `<your-ecr-repo-uri>` with your actual ECR repository URI in the `deployment.yaml` file:

    ```bash
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl apply -f k8s/ingress.yaml
    kubectl apply -f k8s/kong.yaml
    ```

6. Get the external IP of the service:

    ```bash
    kubectl get svc ingress-nginx-controller -n app
    ```

7. Access the application:
    Open your browser and navigate to `http://<EXTERNAL-IP>/api/health`.
