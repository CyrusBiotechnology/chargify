# chargify — client library for the Chargify API

## Tests

### With mocks:

```bash
npm test
```

### Without mocks:

```bash
TEST_CHARGIFY_SKIP_MOCKS=true \
TEST_CHARGIFY_API_KEY=<api-key> \
TEST_CHARGIFY_SUBDOMAIN=<subdomain> \
TEST_CHARGIFY_PRODUCT_FAMILY_ID=<product-family-id> \
TEST_CHARGIFY_COMPONENT_1_ID=<component-id> \
TEST_CHARGIFY_COMPONENT_1_HANDLE=<component-handle> \
npm test
```

## Notes

### url

The npm module `url` is used in place of the NodeJS built-in `url` module.
[NodeJS has deprecated `url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject)
and [plans to remove it after the 13.0.0 release](https://github.com/nodejs/node/issues/23694).
