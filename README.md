# Table of contents

## Project description
   - This project has a CI/CD pipeline to deploy code to the EC2 instance.
   - Also a pipeline to lint and test
   - TBD....

## How to set up architecture for a deployment?
Follow these steps to configure your own infra for a ddeployments:
* Create an AWS account
* Go to AWS EC2 and create a security group firstly (or change the existing one)
  Your security group must have these "Inbound rules"
<img width="1421" alt="image" src="https://github.com/user-attachments/assets/d96891b1-c8e2-4870-b35d-035cbbf061cc">

* Create a key-pair in EC2 and store it on your local machine
* Create an EC2 instance using createad security-group and key-pair
* Create an elastic-ip in EC2 and attach it to your EC2 instance

## How to configure your local machine to have an access to EC2
On Mac: 
Here’s a step-by-step guide to using an EC2 key pair to connect to your EC2 instance via SSH.

### Step 1: Download the Key Pair

When you create an EC2 instance on AWS, you’re prompted to create or use an existing key pair. If you create a new key pair, download it to your local machine. The file will typically have a `.pem` extension.

1. **Save the Key Pair**: Save the `.pem` file to a secure location on your local machine. **Do not share this file**—it’s essential for securely accessing your instance.

2. **Set Permissions**: By default, SSH requires the private key file to have restricted permissions. Run the following command to set the correct permissions:

    ```bash
    chmod 400 /path/to/your-key.pem
    ```

    Replace `/path/to/your-key.pem` with the actual path to your `.pem` file.

### Step 2: Identify Your EC2 Instance’s Public IP or DNS

In the AWS Management Console:

1. Go to the **EC2 Dashboard**.
2. Find your instance and locate its **Public IPv4 address** or **Public DNS** in the instance details.

This IP or DNS is what you’ll use to connect to your instance.

### Step 3: Connect to the EC2 Instance Using SSH

Open a terminal and run the following SSH command:

```bash
ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-ip
```

Replace the following:
- `/path/to/your-key.pem`: Path to your downloaded `.pem` key file.
- `ec2-user`: This is usually the default username for Amazon Linux, but it may vary depending on the OS:
  - **Amazon Linux/Ubuntu**: `ec2-user`
  - **Ubuntu**: `ubuntu`
  - **CentOS**: `centos`
  - **RHEL**: `ec2-user`
  - **Debian**: `admin` or `root`
- `your-ec2-public-ip`: The public IP address or DNS of your EC2 instance.

> You can find the ssh connection string in "instance -> actions -> connect -> SSH client"

For example:

```bash
ssh -i ~/Downloads/my-ec2-key.pem ec2-user@18.195.39.245
```

If everything is configured correctly, you should now be connected to your EC2 instance.

### Step 4: (Optional) Add the Key to Your SSH Agent

If you frequently access this instance, you might want to add the key to your SSH agent for convenience.

1. Start the SSH agent (if it isn’t running):

    ```bash
    eval "$(ssh-agent -s)"
    ```

2. Add the private key to the agent:

    ```bash
    ssh-add /path/to/your-key.pem
    ```

Now, you should be able to SSH into your instance without specifying the key every time.

### Troubleshooting

1. **Permission Denied (Public Key)**: Ensure your `.pem` file permissions are set to `400`.
2. **Access Denied**: Confirm you’re using the correct default username for your EC2 instance's operating system.
3. **No SSH Connection**: Ensure your EC2 instance’s security group allows inbound SSH traffic on port 22 (source IP 0.0.0.0/0 for open access or restrict it to your IP).


## What env params do you need to set in your GitHub repo for a CI/CD pipeline to work
Secrets:
<img width="786" alt="image" src="https://github.com/user-attachments/assets/4aa143cc-f5bd-43c8-9040-114cfa1dc286">

Envs:
<img width="820" alt="image" src="https://github.com/user-attachments/assets/e43f5578-dc83-4e45-8c63-8266b83a6ff9">


## [How to test this project](#how-to-test-this-project)

---

# How to test this project on web

1. Go to instances and find a "Public IP" there
<img width="827" alt="image" src="https://github.com/user-attachments/assets/f7084299-375c-45f8-a648-bbff4fef2485">

2. Paste this Public IP to browser and add a port to which you have your app in instance's docker-compose.yml file (Now it's 8080)
For example: http://18.195.39.245:8080/
