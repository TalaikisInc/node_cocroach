#!/bin/bash

cockroach cert create-ca --certs-dir=certs --ca-key=certs/ca.key
cockroach cert create-client cocroach --certs-dir=certs --ca-key=certs/ca.key