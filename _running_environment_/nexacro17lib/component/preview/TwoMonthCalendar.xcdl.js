//==============================================================================
//	개발중인 Compostie Component의 Component Class에 대한 정의를 작성합니다.
//==============================================================================
//==============================================================================
// Object : nexacro.TwoMonthCalendar
// Group : Component
//==============================================================================
if (!nexacro.TwoMonthCalendar)
{
	//==============================================================================
	// nexacro.TwoMonthCalendar
	//==============================================================================
	nexacro.TwoMonthCalendar = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
	{
		nexacro._CompositeComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this.addEvent("onchanged");
	};
	
	var _pTwoMonthCalendar = nexacro._createPrototype(nexacro._CompositeComponent, nexacro.TwoMonthCalendar);
	nexacro.TwoMonthCalendar.prototype = _pTwoMonthCalendar;
	_pTwoMonthCalendar._type_name = "TwoMonthCalendar";
	
	/* accessibility */
	_pTwoMonthCalendar.accessibilityrole = "button";

	_pTwoMonthCalendar.fromValue = undefined;
	_pTwoMonthCalendar.set_fromValue = function (v)
	{
		if(this.form.calFrom)
		{
			this.form.calFrom.set_value(v);
		}
		this.fromValue = v;
	};
	
	_pTwoMonthCalendar.toValue = undefined;
	_pTwoMonthCalendar.set_toValue = function (v)
	{
		if(this.form.calTo)
		{
			this.form.calTo.set_value(v);
		}
		this.fromValue = v;
	};
	
	_pTwoMonthCalendar.getDayCount = function ()
	{
		var fromDate = new Date();
		var toDate = new Date();
		var calDate;
		var day = 1000*60*60*24;
		var returnvalue = -1;
		
		if(this.form.calFrom.value && this.form.calTo.value)
		{
			fromDate.setFullYear(this.form.calFrom.getYear());
			fromDate.setMonth(this.form.calFrom.getMonth()-1);
			fromDate.setDate(this.form.calFrom.getDay());
			
			toDate.setFullYear(this.form.calTo.getYear());
			toDate.setMonth(this.form.calTo.getMonth()-1);
			toDate.setDate(this.form.calTo.getDay());
			
			calDate = fromDate.getTime() - toDate.getTime();
			trace("calDate: "+calDate);
			
			returnvalue = Math.abs(calDate/day);
		}
		trace("returnvalue: "+returnvalue);
		return returnvalue;
	};
	
	// 이벤트의 경우에는 모듈 디벨로퍼 내에서 테스트 할 수 있는 방법이 모호함
	_pTwoMonthCalendar.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
	{
		if (this.onchanged && this.onchanged._has_handlers)
		{
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
		return false;
	};	
	
	_pTwoMonthCalendar.addDay = function (nDay)
	{
		var fromDate = new Date();
		var toDate = new Date();
		
		if(this.form.calFrom.value)
		{
			fromDate.setFullYear(this.form.calFrom.getYear());
			fromDate.setMonth(this.form.calFrom.getMonth()-1);
			fromDate.setDate(this.form.calFrom.getDay());
			toDate = new Date(fromDate.addDate(nDay));
			
			var year = toDate.getFullYear().toString().padLeft(4, "0");
			var month = (toDate.getMonth()+1).toString().padLeft(2, "0");
			var day = toDate.getDate().toString().padLeft(2, "0");			
			
			this.form.calTo.set_value(year+month+day);
			return true;
		}
		else
		{
			trace("calFrom value is null");
			return false;
		}
	};	
	
	_pTwoMonthCalendar.on_init_bindSource = function (columnid, propid, ds)
	{
		if (propid == "fromValue") {
			this.fromValue = undefined;
		}		
	};	
	
	_pTwoMonthCalendar.on_change_bindSource = function (propid, ds, row, col)
	{
		if (propid == "fromValue")
        {	
			if (this.form.calFrom)
				this.form.calFrom.on_change_bindSource("value", ds, row, col);
        }
	};	
	
	_pTwoMonthCalendar.on_getBindableProperties = function ()
	{
		return "fromValue";
	};	
	
	
	// move 이벤트로는 발생하지 않음
	// left, top 변경 시에도 발생하지 않음
	_pTwoMonthCalendar.on_change_containerPos = function (left, top)
	{
		nexacro._CompositeComponent.prototype.on_change_containerPos.call(this, left, top);
		// TODO : enter your code here.
		
	};	
	
	// form on_load 이벤트 시 한번 발생
	// width, height 변경 시에도 발생
	_pTwoMonthCalendar.on_change_containerRect = function (width, height)
	{
		nexacro._CompositeComponent.prototype.on_change_containerRect.call(this, width, height);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_apply_prop_cssclass
	DESCRIPTION : 컴포넌트의 cssclass property 값이 변경될때 호출됨
	PARAMETER : void
	RETURN : void
	************************************************************************/
	_pTwoMonthCalendar.on_apply_prop_cssclass = function ()
	{
		nexacro._CompositeComponent.prototype.on_apply_prop_cssclass.call(this);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_apply_prop_enable
	DESCRIPTION : 컴포넌트의 enable property 값이 변경되거나 enable 상태가 변경될때 호출됨
	PARAMETER : enable:boolean (true : enable됨 / false : disable 됨)
	RETURN : void
	************************************************************************/
	_pTwoMonthCalendar.on_apply_prop_enable = function (enable)
	{
		nexacro._CompositeComponent.prototype.on_apply_prop_enable.call(this, enable);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_apply_text
	DESCRIPTION : 컴포넌트의 text, expr property 값이 변경될때 호출됨
	PARAMETER : text : string (실제 적용할 text)
	RETURN : void
	************************************************************************/
	_pTwoMonthCalendar.on_apply_text = function (text)
	{
		nexacro._CompositeComponent.prototype.on_apply_text.call(this, text);
		// TODO : enter your code here.
		
	};	
	
	// form on_load 이벤트 시 한번 발생
	_pTwoMonthCalendar.on_attach_contents_handle = function (win)
	{
		nexacro._CompositeComponent.prototype.on_attach_contents_handle.call(this, win);
		// TODO : control의 attachHandle() 함수를 호출해 nexacro.Element의 handle에 실제 node handle을 attach.
		// enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_changeUserStatus
	DESCRIPTION : 컴포넌트의 userstatus 가 변경되었을 때 호출되는 함수
	PARAMETER : changestatus : string(변경된 userstatus), value : boolean(변경된 userstatus의 값), applyuserstatus : string(엔진내에서 선택한 userstatus), currentstatus : string(현재 적용중인 status), currentuserstatus : string(현재 적용중인 userstatus)
	RETURN : applyuserstatus : string
	************************************************************************/
	_pTwoMonthCalendar.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
	{
		return nexacro._CompositeComponent.prototype.on_changeUserStatus.call(this,changestatus, value, applyuserstatus, currentstatus, currentuserstatus);
		// TODO : enter your code here.
		
	};	
	
	// form on_load 이벤트 시 한번 발생
	_pTwoMonthCalendar.on_create_contents = function ()
	{
		nexacro._CompositeComponent.prototype.on_create_contents.call(this);
		// TODO : enter your code here.
		
	};	
	
	// form on_load 이벤트 시 한번 발생
	_pTwoMonthCalendar.on_create_contents_command = function ()
	{
		var ret = nexacro._CompositeComponent.prototype.on_create_contents_command.call(this);
		// TODO : control의 createCommnad() 함수를 호출해 innerhtml 형태의 string을 만든다.
		// enter your code here.
		
		return ret;
	};	
	
	_pTwoMonthCalendar.on_created_contents = function (win)
	{
		nexacro._CompositeComponent.prototype.on_created_contents.call(this, win);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_destroy_contents
	DESCRIPTION : 컴포넌트가 destroy 될때 호출됨
	PARAMETER : void
	RETURN : void
	************************************************************************/
	_pTwoMonthCalendar.on_destroy_contents = function ()
	{
		nexacro._CompositeComponent.prototype.on_destroy_contents.call(this);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_get_accessibility_action
	DESCRIPTION : 컴포넌트의 accessibility action property 값이 없을 때 읽어줄값 을 정의함
	PARAMETER : void
	RETURN : accessibilityaction : string(읽어줄 action값)
	************************************************************************/
	_pTwoMonthCalendar.on_get_accessibility_action = function ()
	{
		return nexacro._CompositeComponent.prototype.on_get_accessibility_action.call(this);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_get_accessibility_description
	DESCRIPTION : 컴포넌트의 accessibility description property 값이 없을 때 읽어줄값 을 정의함
	PARAMETER : void
	RETURN : accessibilitydescription : string (읽어줄 description값)
	************************************************************************/
	_pTwoMonthCalendar.on_get_accessibility_description = function ()
	{
		return nexacro._CompositeComponent.prototype.on_get_accessibility_description.call(this);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : on_get_accessibility_label
	DESCRIPTION : 컴포넌트의 accessibility label property 값이 없을 때 읽어줄값 을 정의함
	PARAMETER : void
	RETURN : accessibilitylabel : string(읽어줄 label값)
	************************************************************************/
	_pTwoMonthCalendar.on_get_accessibility_label = function ()
	{
		return nexacro._CompositeComponent.prototype.on_get_accessibility_label.call(this);
		// TODO : enter your code here.
		
	};	
	
	/************************************************************************
	FUNCTION : _get_form_module
	DESCRIPTION :
	RETURN :
	************************************************************************/
	_pTwoMonthCalendar._get_form_module = function ()
	{
		return function()
		{
			if (!this._is_form)
			return;
			
			var obj = null;
			
			this.on_create = function()
			{
				this.set_name("TwoMonthCalendar_V2");
				this.set_titletext("TwoMonthCalendar_V2");
				if (nexacro.Form == this.constructor)
				{
					this._setFormPosition(405,200);
				}
				
				// Object(Dataset, ExcelExportObject) Initialize
				
				
				// UI Components Initialize
				obj = new nexacro.Calendar("calFrom","0","0","200","200",null,null,null,null,null,null,this);
				obj.set_taborder("0");
				obj.set_type("monthonly");
				obj.set_locale("en_US");
				obj.set_cssclass("simple_module");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Calendar("calTo","205","0","200","200",null,null,null,null,null,null,this);
				obj.set_taborder("1");
				obj.set_type("monthonly");
				obj.set_locale("en_US");
				obj.set_cssclass("simple_module");
				this.addChild(obj.name, obj);
				
				// Layout Functions
				//-- Default Layout : this
				obj = new nexacro.Layout("default","",405,200,this,function(p){});
				this.addLayout(obj.name, obj);
				
				// BindItem Information
				
			};
			
			this.loadPreloadList = function()
			{
				
			};
			
			// User Script
			this.registerScript("TwoMonthCalendar.xcdl", function() {
					
					this.calFrom_onchanged = function(obj,e)
					{
						if(this.parent.applyto_bindSource("fromValue", e.postvalue))
						{
							this.parent.set_fromValue(e.postvalue);
							this.parent.on_fire_onchanged(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
						}
					};
					
					this.calTo_onchanged = function(obj,e)
					{
						if(this.parent.applyto_bindSource("toValue", e.postvalue))
						{
							this.parent.set_toValue(e.postvalue);
							this.parent.on_fire_onchanged(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
						}
					};
					
				});
			
			// Regist UI Components Event
			this.on_initEvent = function()
			{
				this.calFrom.addEventHandler("onchanged",this.calFrom_onchanged,this);
				this.calTo.addEventHandler("onchanged",this.calTo_onchanged,this);
			};
			
			this.loadIncludeScript("TwoMonthCalendar.xcdl");
			this.loadPreloadList();
			
			// Remove Reference
			obj = null;
		};
	};	
	
	delete _pTwoMonthCalendar;
}