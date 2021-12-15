export function constructSocialMediaProfileLinkage(did: string, date: string, profileUrl: string) {
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/ld-context.json",
      ],
      type: ["VerifiableCredential", "SocialMediaProfileLinkage"],
      issuer: did,
      issuanceDate: date,
      credentialSubject: {
        socialMediaProfileUrl: profileUrl,
        id: did,
      },
      credentialSchema: {
        id: "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/json-schema.json",
        type: "JsonSchemaValidator2018",
      },
      proof: {
        verificationMethod: did + "#controller",
        created: date,
        proofPurpose: "assertionMethod",
        type: "EthereumEip712Signature2021",
      }
    };
  }

  export const socialMediaProfileLinkageTypes = 
  {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
    ],
    VerifiableCredential: [
      {
        name: "@context",
        type: "string[]",
      },
      {
        name: "type",
        type: "string[]",
      },

      {
        name: "issuer",
        type: "string",
      },
      {
        name: "issuanceDate",
        type: "string",
      },
      {
        name: "credentialSubject",
        type: "CredentialSubject",
      },
      {
        name: "credentialSchema",
        type: "CredentialSchema",
      },
      {
        name: "proof",
        type: "Proof",
      },
    ],
    CredentialSchema: [
      {
        name: "id",
        type: "string",
      },
      {
        name: "type",
        type: "string",
      },
    ],
    CredentialSubject: [
      {
        name: "socialMediaProfileUrl",
        type: "string",
      },
      {
        name: "id",
        type: "string",
      },
    ],
    Proof: [
      {
        name: "verificationMethod",
        type: "string",
      },
      {
        name: "created",
        type: "string",
      },
      {
        name: "proofPurpose",
        type: "string",
      },
      {
        name: "type",
        type: "string",
      },
    ],
  };

  export function constructDomainLinkage(did: string, date: string, profileUrl: string) { 
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://identity.foundation/.well-known/contexts/did-configuration-v0.2.jsonld",
      ],
      type: ["VerifiableCredential", "DomainLinkageCredential"],
      issuer: did,
      issuanceDate: date,
      credentialSubject: {
        origin: profileUrl,
        id: did,
      },
      proof: {
        verificationMethod: did + "#controller",
        created: date,
        proofPurpose: "assertionMethod",
        type: "EthereumEip712Signature2021",
      },
    };
}

export const domainLinkageTypes = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
  ],
  VerifiableCredential: [
    {
      name: "@context",
      type: "string[]",
    },
    {
      name: "type",
      type: "string[]",
    },

    {
      name: "issuer",
      type: "string",
    },
    {
      name: "issuanceDate",
      type: "string",
    },
    {
      name: "credentialSubject",
      type: "CredentialSubject",
    },
    {
      name: "proof",
      type: "Proof",
    },
  ],
  CredentialSubject: [
    {
      name: "origin",
      type: "string",
    },
    {
      name: "id",
      type: "string",
    },
  ],
  Proof: [
    {
      name: "verificationMethod",
      type: "string",
    },
    {
      name: "created",
      type: "string",
    },
    {
      name: "proofPurpose",
      type: "string",
    },
    {
      name: "type",
      type: "string",
    },
  ],
};