import graphene
import graphql_jwt

import users.schema
import links.schema
import practice_cards.schema


class Query(users.schema.Query,
            links.schema.Query,
            practice_cards.schema.Query,
            graphene.ObjectType):
    pass


class Mutation(users.schema.Mutation,
               links.schema.Mutation,
               practice_cards.schema.Mutation,
               graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
