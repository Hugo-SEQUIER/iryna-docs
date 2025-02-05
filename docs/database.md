---
sidebar_position: 3
title: "Database"
hidden: false
lastUpdatedAt: "2024-10-23"
---

# Database

## Irys: A Programmable Datachain

Irys is the first Layer 1 (L1) programmable datachain designed to optimize both data storage and execution. By integrating storage and execution, Irys enhances the utility of blockspace, enabling a broader spectrum of web services to operate on-chain-services that are currently not feasible.

### Key Features of Irys

- **Unified Platform:** Combines data storage and execution, allowing developers to eliminate dependencies and integrate efficient on-chain data seamlessly.
- **Cost-Effective Storage:** Optimized specifically for data storage, making it significantly cheaper to store data on-chain compared to traditional blockchains focused on smart contracts and financial applications.
- **Programmable Datachain:** The IrysVM can utilize on-chain data during computations, enabling dynamic and real-time applications within a single platform.
- **Decentralization:** Designed to minimize centralization risks by distributing control, enhancing the security and trustworthiness of the network.
- **Free Storage for Small Data:** Storing less than 100KB of data is free, making it accessible for small-scale applications and metadata storage.
- **GraphQL Querying:** Metadata stored on Irys can be queried using GraphQL, providing a flexible and efficient way to retrieve on-chain data.

### Key Management

To provide a seamless and user-friendly experience akin to Web2 applications, we have implemented a key management system that stores users' private keys securely. This approach eliminates the need for users to sign each interaction manually, enhancing convenience while maintaining security. However, storing private keys introduces certain responsibilities and risks, which we address through robust security measures and clear usage policies.

1. **User Secret Generation:** When a user creates a new account, we generate a unique keypair for them. The keypair consists of a public key and a private key.

2. **Encryption and Storage:**
   
   a. **Public Key Encryption:** The public key is encrypted using the user's private key. This ensures that the public key remains secure and is only accessible to authorized processes.
   
   b. **Private Key Encryption:** The private key is encrypted using the application's secret key. This encryption process ensures that even if the database is compromised, the private keys remain protected.
   
   c. **Database Storage:** Both the encrypted public key and the encrypted private key are stored securely in our database. Access to these keys is tightly controlled and monitored to prevent unauthorized usage.
   
3. **Private Key Handling:**
   
   - **Access Control:** The encrypted private key is decrypted server-side using the application secret when necessary for authorized operations. This allows the system to manage keys without exposing them to the client-side, enhancing security.
   
   - **Secure Transmission:** All communications involving key operations are conducted over encrypted channels (HTTPS), ensuring that keys are not exposed during transmission.
   
   - **Memory Management:** Private keys are handled in memory securely and are not stored in any persistent storage on the server beyond their encrypted form in the database.
   
4. **Data Encryption and Decryption:** 
   - **Encryption:** Data is encrypted using the user's public key. This can be performed either on the client-side or server-side, leveraging the non-sensitive nature of the public key.
   - **Decryption:** Decryption occurs on the server-side using the decrypted private key. Only the system, authenticated through the application's secret, can decrypt the data, ensuring that sensitive information remains protected.

It's important to note that the sole purpose of these keys is for data encryption and decryption within our platform. The public key is used to encrypt data, while the private key is used to decrypt it. We do not add funds to these wallets, and we strongly recommend that users do not add any funds or use these keys for any external applications or services. This practice ensures the security and integrity of the data within our platform.

These key management practices ensure that user keys are securely generated, stored, and managed, providing a robust defense against various security threats while maintaining the convenience expected from modern Web2 applications.

### Retrieving Metadata

Irys provides a powerful GraphQL API for querying transaction metadata. This allows you to efficiently retrieve and filter data stored on the Irys network. Here's a comprehensive guide on how to use this feature:

#### GraphQL Query Structure

The basic structure of a GraphQL query to retrieve metadata looks like this:

```graphql
query getByOwner($appPublicKey: String!, $userPublicKey: String!) {
    transactions(
        owners: [$appPublicKey], 
        tags: [{name: "address", values: [$userPublicKey]}]
    ) {
        edges {
            node {
                id
            }
        }
    }
}
```

This query does the following:
- Filters transactions by the `appPublicKey` (owner of the transaction -- Us, the application)
- Further filters by a tag with the name "address" and the value of `userPublicKey` (the user's public key)
- Retrieves the transaction ID

#### Retrieving Transaction Data

Once you have the transaction IDs, you can retrieve the actual data using the Irys gateway:

```javascript
const transactionId = data.transactions.edges[0].node.id;
const dataUrl = `https://gateway.irys.xyz/${transactionId}`;

const response = await fetch(dataUrl);
const transactionData = await response.json();
```

#### Application Public Key

The application public key is used to identify the application when querying the Irys network. It is the public key of the application's keypair.

```json
API: 0xfd10254d64d1f0a6491f93e889f40aaadb605db2bdffa83a5e7e563495d82708
Chatbot: 0x67e63976696ef10f37b169f53986afc5c63c0cf1d2c30cf420ee514157c7ed2f
Training: 0x3b68e36d4e2d07683597d96a0bf20b1115c45c8acf17e979b7cf09f1ebd4f2c8
```

By leveraging these querying capabilities, we can efficiently retrieve and manage data stored on the Irys network, enabling powerful and flexible data management in our application.

## Supabase: Open-Source Database Solution

Supabase is an open-source database platform that offers robust authentication and user management capabilities. It serves as the backbone for managing user data and authentication processes, ensuring secure and efficient handling of user information.

### Key Features of Supabase

- **Authentication:** Provides comprehensive authentication services, including support for various authentication methods and secure user management.
- **Real-Time Database:** Enables real-time data synchronization, allowing applications to respond instantly to data changes.
- **Scalability:** Designed to scale with your application, handling increasing loads without compromising performance.
- **Open-Source:** Offers transparency and flexibility, allowing developers to customize and extend functionality as needed.

## Integration of Irys and Supabase

At Trophē, we leverage both Irys and Supabase to create a powerful and secure platform:

- **Metadata Storage with Irys:** We use Irys to store metadata on the blockchain, benefiting from its cost-effective and programmable datachain capabilities. This ensures that metadata is securely stored and easily accessible for on-chain applications. Each user is assigned a keypair upon account creation, facilitating the storage and retrieval of metadata. Storing less than 100KB of data is free, and metadata can be queried using GraphQL.
- **Authentication and User Information with Supabase:** Supabase handles authentication and manages user information, providing a reliable and scalable solution for securing user data and managing access control.

By integrating Irys and Supabase, we combine the strengths of blockchain-based data storage with modern authentication solutions, delivering a seamless and secure user experience.

## Conclusion

Our database strategy utilizes Irys for efficient and programmable on-chain metadata storage and Supabase for robust authentication and user management. By storing users' private keys securely within our system, we provide a Web2-like experience that eliminates the need for manual signing of interactions, enhancing convenience without compromising security. This combination ensures that our platform is both secure and scalable, capable of supporting innovative applications and providing a solid foundation for future growth.

**Disclaimer:** The private keys managed by Trophē are intended exclusively for use within our platform. Users are strongly advised not to use their keypairs for any external applications or services to prevent security vulnerabilities and ensure the integrity of their data within Trophē.
