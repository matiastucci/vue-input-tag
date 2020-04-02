import { shallowMount } from "@vue/test-utils";
import InputTag from "@/components/InputTag.vue";

async function addTag(wrapper, newTag) {
  // TODO: use wrapper.trigger('keydown', { which: 65 })
  // so we have an event on the vm.addNew method
  wrapper.setData({ newTag });
  await wrapper.vm.addNew();
}

describe("InputTag.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(InputTag);
  });

  it("should have a new tag input without placeholder", () => {
    const input = wrapper.find("input.new-tag");
    expect(input.attributes().placeholder).toEqual("");
  });

  describe("addNew()", () => {
    beforeEach(async () => {
      await addTag(wrapper, "tag 1");
      await addTag(wrapper, "tag 1");
      await addTag(wrapper, "tag 2");
    });

    it("should have 2 tags", () => {
      expect(wrapper.vm.innerTags.length).toEqual(2);
    });

    it("should have a 'tag 1'", () => {
      expect(wrapper.vm.innerTags[0]).toEqual("tag 1");
    });

    it("should have a 'tag 2'", () => {
      expect(wrapper.vm.innerTags[1]).toEqual("tag 2");
    });

    it("should reset the new tag", () => {
      expect(wrapper.vm.newTag).toEqual("");
    });

    it("should emmit a tag change event", () => {
      expect(wrapper.emitted()["update:tags"]).toBeTruthy();
    });

    it("should emmit an input event", () => {
      expect(wrapper.emitted()["input"]).toBeTruthy();
    });

    it("should have 2 remove tag buttons", () => {
      expect(wrapper.findAll("a.remove").length).toEqual(2);
    });
  });

  describe("remove(index)", () => {
    beforeEach(async () => {
      await addTag(wrapper, "tag 1");
      await addTag(wrapper, "tag 2");
      await addTag(wrapper, "tag 3");

      wrapper.vm.remove(1);
    });

    it("should have 2 tags", () => {
      expect(wrapper.vm.innerTags.length).toEqual(2);
    });

    it("should have a 'tag 1'", () => {
      expect(wrapper.vm.innerTags[0]).toEqual("tag 1");
    });

    it("should have a 'tag 3'", () => {
      expect(wrapper.vm.innerTags[1]).toEqual("tag 3");
    });
  });

  describe("removeLastTag()", () => {
    beforeEach(async () => {
      await addTag(wrapper, "tag 1");
      await addTag(wrapper, "tag 2");
      await addTag(wrapper, "tag 3");

      wrapper.vm.removeLastTag();
      console.log(wrapper.vm.innerTags);
    });

    it("should have 2 tags", () => {
      expect(wrapper.vm.innerTags.length).toEqual(2);
    });

    it("should have a 'tag 1'", () => {
      expect(wrapper.vm.innerTags[0]).toEqual("tag 1");
    });

    it("should have a 'tag 2'", () => {
      expect(wrapper.vm.innerTags[1]).toEqual("tag 2");
    });
  });

  describe("Props", () => {
    describe("allow-duplicates='false'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { allowDuplicates: true }
        });
        addTag(wrapper, "tag 1");
        addTag(wrapper, "tag 1");
        addTag(wrapper, "tag 1");
      });

      it("should have 3 tags", () => {
        expect(wrapper.vm.innerTags.length).toEqual(3);
      });

      it("should have a 'tag 1'", () => {
        expect(wrapper.vm.innerTags[2]).toEqual("tag 1");
      });
    });

    describe("read-only='true'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { readOnly: true }
        });

        addTag(wrapper, "tag 1");
      });

      it("should have a read-only CSS class", () => {
        expect(wrapper.findAll(".read-only").length).toEqual(1);
      });

      it("shouldn't have a remove tag button", () => {
        expect(wrapper.findAll("a.remove").length).toEqual(0);
      });

      it("shouldn't have a new input tag", () => {
        expect(wrapper.findAll("input.new-tag").length).toEqual(0);
      });
    });

    describe("value='[1, 2, 3]'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { value: [1, 2, 3] }
        });
      });

      it("should have 3 tags", () => {
        expect(wrapper.vm.innerTags.length).toEqual(3);
      });
    });

    describe.skip("dynamic value", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { value: [1, 2, 3] }
        });
      });

      it("should watch value property changes", () => {
        wrapper.setProps({ value: [1, 2, 3, 4] });
        expect(wrapper.vm.innerTags.length).toEqual(4);
      });
    });

    describe("validate='text'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { validate: "text" }
        });

        addTag(wrapper, "123");
        addTag(wrapper, "mati@tucci.me");
        addTag(wrapper, "https://tucci.me");
        addTag(wrapper, "2002-04-03");
        addTag(wrapper, "foo");
      });

      it("should have 1 tag", () => {
        expect(wrapper.vm.innerTags.length).toEqual(1);
      });

      it("should have a tag 'foo'", () => {
        expect(wrapper.vm.innerTags[0]).toEqual("foo");
      });
    });

    describe("validate='digits'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { validate: "digits" }
        });

        addTag(wrapper, "mati@tucci.me");
        addTag(wrapper, "https://tucci.me");
        addTag(wrapper, "123");
        addTag(wrapper, "2002-04-03");
        addTag(wrapper, "foo");
      });

      it("should have 1 tag", () => {
        expect(wrapper.vm.innerTags.length).toEqual(2);
      });

      it("should have a tag '123'", () => {
        expect(wrapper.vm.innerTags[0]).toEqual("123");
      });
    });

    describe("validate='email'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { validate: "email" }
        });

        addTag(wrapper, "https://tucci.me");
        addTag(wrapper, "2002-04-03");
        addTag(wrapper, "foo");
        addTag(wrapper, "123");
        addTag(wrapper, "mati@tucci.me");
      });

      it("should have 1 tag", () => {
        expect(wrapper.vm.innerTags.length).toEqual(1);
      });

      it("should have a tag 'mati@tucci.me'", () => {
        expect(wrapper.vm.innerTags[0]).toEqual("mati@tucci.me");
      });
    });

    describe("validate='url'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { validate: "url" }
        });

        addTag(wrapper, "2002-04-03");
        addTag(wrapper, "foo");
        addTag(wrapper, "123");
        addTag(wrapper, "mati@tucci.me");
        addTag(wrapper, "https://tucci.me");
      });

      it("should have 1 tag", () => {
        expect(wrapper.vm.innerTags.length).toEqual(1);
      });

      it("should have a tag 'https://tucci.me'", () => {
        expect(wrapper.vm.innerTags[0]).toEqual("https://tucci.me");
      });
    });

    describe("validate='isodate'", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { validate: "isodate" }
        });

        addTag(wrapper, "foo");
        addTag(wrapper, "123");
        addTag(wrapper, "mati@tucci.me");
        addTag(wrapper, "https://tucci.me");
        addTag(wrapper, "2002-04-03");
      });

      it("should have 1 tag", () => {
        expect(wrapper.vm.innerTags.length).toEqual(1);
      });

      it("should have a tag '2002-04-03'", () => {
        expect(wrapper.vm.innerTags[0]).toEqual("2002-04-03");
      });
    });

    describe("before-adding", () => {
      beforeEach(() => {
        wrapper = shallowMount(InputTag, {
          propsData: { beforeAdding: tag => tag.toUpperCase() }
        });

        addTag(wrapper, "new tag");
      });

      it("should have an uppercase tag", () => {
        expect(wrapper.vm.innerTags[0]).toEqual("NEW TAG");
      });
    });
  });

  describe.skip("CSS classes", () => {
    it("should add activity class when input is focused", () => {
      const vueInputTagWrapper = wrapper.find(".vue-input-tag-wrapper");

      const input = wrapper.find("input.new-tag");
      input.trigger("focus");

      expect(vueInputTagWrapper.classes()).toContain(
        "vue-input-tag-wrapper--active"
      );
    });

    it("should remove activity class when input is blurred", () => {
      const vueInputTagWrapper = wrapper.find(".vue-input-tag-wrapper");

      const input = wrapper.find("input.new-tag");
      input.trigger("focus");
      input.trigger("blur");

      expect(
        vueInputTagWrapper.classes()["vue-input-tag-wrapper--active"]
      ).toBeUndefined();
    });
  });

  describe("slots", () => {
    beforeEach(() => {
      wrapper = shallowMount(InputTag, {
        slots: {
          "remove-icon": '<span class="close" />'
        }
      });

      addTag(wrapper, "foo");
    });

    it("should render 'remove icon' slot as remove icon for a tag", () => {
      expect(wrapper.find("a.remove").html()).toBe(
        '<a class="remove"><span class="close"></span></a>'
      );
    });
  });
});
