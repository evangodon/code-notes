import graphene
from graphene_django import DjangoObjectType

from .models import PracticeCard


class PracticeCardType(DjangoObjectType):
    class Meta:
        model = PracticeCard


class Query(graphene.ObjectType):
    practice_cards = graphene.List(
        PracticeCardType
    )

    def resolve_practice_cards(self, info, **kwargs):
        return PracticeCard.objects.all()


class CreatePracticeCard(graphene.Mutation):
    id = graphene.Int()
    category = graphene.String()
    question = graphene.String()
    answer = graphene.String()

    class Arguments:
        category = graphene.String()
        question = graphene.String()
        answer = graphene.String()

    def mutate(self, info, category, question, answer):
        practice_card = PracticeCard(
            category=category,
            question=question,
            answer=answer
        )

        practice_card.save()

        return CreatePracticeCard(
            id=practice_card.id,
            category=category,
            question=question,
            answer=answer
        )


class DeletePracticeCard(graphene.Mutation):
    id = graphene.ID()

    class Arguments:
        id = graphene.ID()

    def mutate(self, info, id):
        instance = PracticeCard.objects.get(id=id)
        instance.delete()

        return True


class Mutation(graphene.ObjectType):
    create_practice_card = CreatePracticeCard.Field()
    delete_practice_card = DeletePracticeCard.Field()
